require 'rails_helper'
#require 'rspec/rails'
# note: require 'devise' after require 'rspec/rails'
require 'devise'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, :type => :controller
end

describe PagesController do
  
  login_user

  describe "GET #todolist " do
    it "returns http success from '/todolist'" do
    	get :todolist
    	response.should be_success
    end

    it 'renders todolist view' do
      get :todolist
      expect(response).to render_template :todolist
    end
#    it 'populates an array of all projects' do
#      project1 = FactoryGirl.create(:project)
#      project2 = FactoryGirl.create(:project)

#      get :todolist

#      expect(assigns(:project)).to match_array([project1, project2])
#    end
  end

  describe "GET 'sql'"
  it "returns http success from '/sql'" do
  	get "sql"
  	response.should be_success #be_redirect
  end

end