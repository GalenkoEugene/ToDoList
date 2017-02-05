class PagesController < ApplicationController
  
  def todolist
  	@project = Project.new
    @task = Task.new

  	@user_id = current_user.id #used in project/_rorm.html.erb
  	@projects = Project.where(user_id: @user_id).order(created_at: :desc) #current user projects
  	@tasks = Task.where(project_id: @projects).order(rating: :desc) #cut down extra projects, list only for current user`s tasks

  end

end
