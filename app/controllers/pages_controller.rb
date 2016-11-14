class PagesController < ApplicationController
  
  def todolist
  	@tasks = Task.all
    @projects = Project.all
    @task = Task.new
    #@user_id = User.find_by(email: current_user.email).id
  end

end
