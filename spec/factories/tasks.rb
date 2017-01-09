FactoryGirl.define do
  factory :task do
  	association(:project)
  	name "Name of task"
  	project_id 7
  end
end