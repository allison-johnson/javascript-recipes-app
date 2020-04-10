Rails.application.routes.draw do
  namespace :api do
    resources :recipes
    resources :notes 
  end #api namespace
end
