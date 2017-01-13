require 'rails_helper'

  describe TasksController do
  	let(:user) { FactoryGirl.create(:user) }
  	let(:task1) { FactoryGirl.create(:task) }
  	let(:this_task) { Task.find(task1.id) }
  	let(:task_status) { this_task.status }
    login_user

    describe "editTaskStatus method" do  

      it "by default has status 'false'" do
      	expect(response).to be_success
      	expect(task_status).to be false
      end

      it "set status 'true', mark task as done" do
        post :editTaskStatus, xhr: true, params: { :task => { id: task1.id, status: true } }
  	    expect(task_status).to be true
  	  end

  	  it "set status 'false', mark task as in proccess.." do
  	  	post :editTaskStatus, xhr: true, params: { :task => { id: task1.id, status: true } }
  	    expect(task_status).to be true
  	  end
    end

    describe "editTaskName method" do
      new_name = "some_new_name"

      it "change name of task" do
      	old_name = task1.name
      	post :editTaskName, xhr: true, params: { :task => { id: task1.id, name: new_name } }
      	expect(this_task.name).to eq(new_name)
      	expect(this_task.name).not_to eq(old_name)
      end

      it "doesn't change status" do
      	post :editTaskStatus, xhr: true, params: { :task => { id: task1.id, status: true } }
      	status_before_edit_name = task_status
      	post :editTaskName, xhr: true, params: { :task => { id: task1.id, name: new_name } }
      	expect(task_status).to eq(status_before_edit_name)
      end

    end

  end
