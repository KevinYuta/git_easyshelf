Rails.application.routes.draw do
  resources :reviews
  devise_for :users
  root to: "review#index"
end
