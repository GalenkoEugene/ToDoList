FactoryGirl.define do
  factory :project do
  	association(:user)
  	name "Test Name of project by FactoryGirl"
  	#user_id 1
  end
end