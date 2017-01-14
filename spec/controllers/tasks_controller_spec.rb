require 'rails_helper'

  describe TasksController do
  	#let(:user) { FactoryGirl.create(:user) }
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

    describe "setDeadline method" do
    let(:day_of_deadline) { Time.new.at_beginning_of_day + 7.days }
      it "set deadline for task" do
      	post :setDeadline, xhr: true, params: { task: {id: task1.id, deadline: day_of_deadline} }
      	expect(this_task.deadline).to eq(day_of_deadline)
      end
    end

    describe "swapTasks method" do
      it "swaps tasks" do
      	task1_1 = FactoryGirl.create(:task)
  		task1_2 = FactoryGirl.create(:task)

      	expect(Task.find(task1_1.id).rating).to be < Task.find(task1_2.id).rating
      	post :swapTasks, xhr: true, params: {id_one: task1_1.id, id_two: task1_2.id }
		expect(Task.find(task1_1.id).rating).to be > Task.find(task1_2.id).rating
      end
    end

  end
