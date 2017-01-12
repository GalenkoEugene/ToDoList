class PagesController < ApplicationController
  
  def todolist
  	@project = Project.new
    @task = Task.new

  	#@user_id = current_user.id
  	@projects = Project.where(user_id: (current_user.id)).order(created_at: :desc) #current user projects
  	@tasks = Task.where(project_id: @projects).order(rating: :desc) #cut down extra projects, list only current user tasks

  end

end
