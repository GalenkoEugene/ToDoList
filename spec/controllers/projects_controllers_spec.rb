require 'rails_helper'

describe ProjectsController do
  let(:user) { FactoryGirl.create(:user)	 }

  login_user

  describe "POST edit_project_name" do
    it "return new name of edited project_name" do    #params: { id: 1, name: "new_name_of_project" }, session: { user_id: 1 }
      project1 = FactoryGirl.create(:project)
      post :editProjectName, xhr: true, params: { :project => { id: project1.id, name: "new_name_of_project" } }#, :format => "js" 
      expect(Project.find_by(id: project1.user_id).name).to eq("new_name_of_project")
    end
  end

  describe "POST create" do
  	it "render 'pages/_project_tables' when Ajax is success" do
  	  post :create, xhr: true, params: { :project => {name: "new_project_name", user_id: user.id} }
  	  expect(response).to be_success
  	  expect(response).to render_template("pages/_project_tables")
  	end

  	it "has new empty project" do
  	  #post :create, xhr: true, params: { :project => {name: "new_project_name", user_id: user.id} }
  	  
  	end
  end

end