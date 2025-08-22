Rails.application.routes.draw do
  namespace :api do
  namespace :v1 do
    resources :movies, only: [ :index, :show, :create ]
  end
end

  root "home#index"
  get "*path", to: "home#index", constraints: ->(req) { !req.path.starts_with?("/rails/active_storage") }
end
