FactoryGirl.define do
  factory :user do
    sequence(:email) { |i| "email#{i}@email.com" }
    encrypted_password 	"encrypted_password"				
  end
end