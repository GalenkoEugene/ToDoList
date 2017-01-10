FactoryGirl.define do
  factory :project do
  	association(:user)
  	name "Name of project by FG"
  	user_id 1
  end
end