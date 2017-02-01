FactoryGirl.define do
  factory :task do
  	association(:project)
  	name "Name of task"
  	sequence(:rating) { |i| i }
  	#project_id 7
  end
end