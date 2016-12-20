class PersonsController < ApplicationController
  def profile
  	@info = User.find_by(email: current_user.email)
  end
end
