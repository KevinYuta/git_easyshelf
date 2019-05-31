Rails.application.routes.draw do
  get 'reviews/show'
  get 'reviews/new'
  devise_for :users
  root to: "review#index"
end
