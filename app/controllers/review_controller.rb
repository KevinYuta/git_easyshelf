class ReviewController < ApplicationController
    before_action :authenticate_user!
    
    def index
    end
    
    def show
        @review = REview.find(params[:id])
    end
    
    def new
        @review = Review.new
        respond_to do |format|
            format.html
            format.json#jsonで出力
        end
    end
    
    def create
        @review = Review.new(review_params)
        if @review.save
          redirect_to review_path(@review)
        else
          redirect_to new_review_path
        end
    end
    
    def review_params #ストロングパラメータで制限する。
        params.require(:review).permit(:name, :author, :review, :image_url, :introduction)
    end
end
