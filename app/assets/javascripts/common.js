$(function($) {
  function equalHeight(group) {
    tallest = 0;
    group.each(function() {
      thisHeight = $(this).height();
      if(thisHeight > tallest){
        tallest = thisHeight;
      }
    });
    group.height(tallest);
  }

  $(document).ready(function() {
    //.hogeの中にあるdivの高さを全て同じにする
    equalHeight($("section"));
  });
})(jQuery);