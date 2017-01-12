class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  before_action :authenticate_user! #, except => [:show, :index]
  
  protect_from_forgery with: :exception

  rescue_from ActionController::RoutingError do |exception|
 	logger.error 'Routing error occurred'
 	render plain: '404 Not found', status: 404 
  end
  
end
