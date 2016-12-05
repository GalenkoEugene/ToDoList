class UpdateTaskColumnRatingFromIntegerToDatetime < ActiveRecord::Migration[5.0]
  def up
  	change_column :tasks, :rating, :datetime
  end
end
