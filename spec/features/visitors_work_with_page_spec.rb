require 'spec_helper'

feature 'Visitor signs in' do
  let(:user) { FactoryGirl.create(:user)   }
  before(:each) { sign_in }

  scenario 'open form for add new Project' do ##, :js => true
    expect(page).to have_content("Welcome")
    click_link 'Create new Project'
    expect(page).to have_content("Please enter the name of the project")
  end

  scenario 'create new project and add task' do
    click_link 'Create new Project'

    fill_in 'project[name]', with: 'awesome project'
    click_button 'Create'
    expect(page).to have_content("awesome project")
    
    fill_in 'task[name]', with: 'The best task!'
    click_button 'Add Task'
    expect(page).to have_content("The best task!")
  end

private

    def sign_in
      #user = FactoryGirl.create(:user)
      visit new_user_session_path
      fill_in 'Email address', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Login'
    end
end