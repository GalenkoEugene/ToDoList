class PagesController < ApplicationController
  def todolist
  	@tasks = Task.all
    @projects = Project.all
    @task = Task.new
  end

end
