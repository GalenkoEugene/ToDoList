require 'rails_helper.rb'

RSpec.describe Project, :type => :model do
#  it 'validates presence of user_id' do
#    expect(Project.new(name: 'new project')).to_not be_valid
#  end

#  it 'validates presence of name' do
#  	expect(Project.new(user_id: 7)).to_not be_valid
#  end	
  it { should validate_presence_of :user_id }
  it { should validate_presence_of :name }
end