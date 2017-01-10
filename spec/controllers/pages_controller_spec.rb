require 'rails_helper'

describe PagesController do
  
  login_user

  describe "GET #todolist " do
    it "returns http success from '/todolist'" do
    	get :todolist
    	expect(response).to be_success
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
  	expect(response).to be_success #be_redirect
  end
end