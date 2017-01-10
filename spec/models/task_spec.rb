require "rails_helper"

describe Task do
  it "validates presence of task name" do
  	expect(Task.new()).to_not be_valid
  end

  it "checks belonging to the project" do
  	expect(Task.new(name: "foo")).to_not be_valid	
  end

  it "has status false when task created" do
    new_task = Task.new(name: "foo", project_id: 1)
    expect(new_task.status).to be false
  end
end
