require 'rails_helper'

describe ProjectsController do
  login_user

  describe "POST edit_project_name" do
    it "return new name of edited project_name" do    #params: { id: 1, name: "new_name_of_project" }, session: { user_id: 1 }
      project1 = FactoryGirl.create(:project)
      put :editProjectName, xhr: true, params: { id: project1.id, name: "new_name_of_project" }#, :format => "js" 
      expect(Project.find_by(id: project1.user_id).name).to eq("new_name_of_project")
    end
  end

end