require 'rails_helper'

describe "UserSignin" do
    let(:user) { FactoryGirl.create(:user)	 }
  
    it "should allow a registered user to sign in" do
      visit '/users/sign_in'
      fill_in "inputEmail", :with => user.email
      fill_in "inputPassword", :with => user.password
      click_button "submit"
      expect(page).to have_content("Welcome")
    end

    it "should not allow an unregistered user to sign in" do
      visit '/users/sign_in'
      fill_in "inputEmail", :with => "not_a_real_user@example.com"
      fill_in "inputPassword", :with => "fake_password"
      click_button "submit"
      expect(page).not_to have_content("Welcome")
    end
  
  end
