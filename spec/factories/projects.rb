FactoryGirl.define do
  factory :project do
  	association(:user)
  	name "Name of project"
  	user_id 7
  end
end