$(document).on('turbolinks:load', function() {
    //画像のHTMLを生成する。
    function buildImage(book) {
        var no_image = '<div class="book_image"><img "width="200" height="200" src="<%= image_path('no_image.jpg')%>"></div>';
        var image = '<div class="book_image img-thumbnail"><img "width="250" height="250" + src="' + book[0].summary.cover + '"></div>';
        if (!book[0].summary.cover){
            var image = no_image; //画像がなかった場合の処理
        }else{
            image;
        }
        return image;
    }
    //画像URLを生成する。
    function imageUrl(book){
        var no_image_url = '<%= image_path('/assets/no_image.jpg')%>';
        var image_url = book[0].summary.cover;
        //".jpg"に"_0"を加える。最大サイズの画像を取得できるようになる。
        var image_url = image_url.replace(".jpg", "_0.jpg");        
        if (!book[0].summary.cover){
            var image_url = no_image_url; //画像がなかった場合の処理
        }else{
            image_url
        }
        return image_url;
    }
    function bookDetail (book){
        var bookDetail = $.isEmptyObject(book[0].onix.CollateralDetail);
        if (bookDetail != true){
            $('#introduction').val(book[0].onix.CollateralDetail.TextContent[0].Text);
        }else{
            $('#introduction').val("情報がありません");
        }
    }
    //著者の情報がなかった場合の処理
    function authorName (book) {
        var bookAuthor = $.isEmptyObject(book[0].summary.author);
        if (bookAuthor != true){
            $('#author-name').val(book[0].summary.author);
        }else{
            $('#author-name').val("情報がありません");
        }
    }
    //本の情報がなかった場合のalert
    function noAppendBook(){
        var book = `<div class="alert alert-warning">
        <strong>本情報を取得できませんでした。</strong>
        </div>`
        return book
    }
    //本の情報取得に成功した時のalert
    function appendBook(){
        var book = `<div class="alert alert-primary">
        <strong>本情報の取得に成功しました。</strong>
        </div>`
        return book
    }
    //情報取得後、再度検索バーに入力が開始されたらフォームに入力されている取得済み情報を削除する。
    $('#get-book').on("keyup",function(){
        $('#submit').prop('disabled', false);
        $('.alert').remove();
        $('#book-name').val("");
        $('#author-name').val("");
        $('#image_url').val("");
        $('#introduction').val("");
        $('.book_image').empty();
    });
    //submitタグをクリックするとajaxで処理が開始される。
    $('#submit').on("click",function(e) {
        e.preventDefault();
        var bookName = $('#get-book').find('#isbn').prop('value');
        var requestUrl = 'https://api.openbd.jp/v1/get?isbn=';
        requestUrl += bookName + '&pretty';
        $.ajax({
            type:"GET",
            url:requestUrl,
            dataType:"json"
        })
            //通信が成功したときの処理
            .done(function(data) {
                if (data[0] != null){
                    var image = buildImage(data);
                    // resultに成功失敗のalart表示
                    $('.result').append(appendBook);
                    // 本のタイトル表示
                    $('#book-name').val(data[0].summary.title);
                    //hiddenタグであるimage_urlに取得した画像urlを格納
                    $('#image_url').val(imageUrl(data));
                    // 取得した本の画像を表示
                    $('.result-image').append(image);
                    // 本の著者表示
                    authorName(data);
                    // 本の紹介文表示
                    bookDetail(data);
                    // 本情報取得に成功後 submitタグを押せないようにする。
                    $('#submit').prop('disabled', true);
                } else {
                    // 本情報取得に失敗した際のalert表示
                    $('.result').append(noAppendBook);
                    // 本情報取得に成功後 submitタグを押せないようにする。
                    $('#submit').prop('disabled', true);
                }
            })
            // 通信に失敗した際のalert表示
            .fail(function() {
                alert('情報の取得に失敗しました');
            });
    });
});