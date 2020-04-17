Rails.application.routes.draw do
  namespace :api do
    resources :recipes
    resources :notes 
    resources :days 
  end #api namespace
end
