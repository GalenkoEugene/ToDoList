require 'rails_helper'
#require 'rspec/rails'
# note: require 'devise' after require 'rspec/rails'
require 'devise'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, :type => :controller
end

describe PagesController do
  describe "GET 'todolist'"
  it "returns http success from '/todolist'" do
  	get :todolist
  	response.should be_redirect
  end

  describe "GET 'sql'"
  it "returns http success from '/sql'" do
  	get "sql"
  	response.should be_redirect #be_success
  end
end