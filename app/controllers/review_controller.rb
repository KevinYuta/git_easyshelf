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
end
