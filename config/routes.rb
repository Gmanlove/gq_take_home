Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :incentives
  end

  get '/redeem', to: 'coupons#redeem'
  post '/redeem', to: 'coupons#redeem_coupon' # Rename the route to match the action
  get '/setup', to: 'coupons#setup'
  post '/setup', to: 'coupons#create_coupon' # Rename the route to match the action

  root to: 'home#index'
end
