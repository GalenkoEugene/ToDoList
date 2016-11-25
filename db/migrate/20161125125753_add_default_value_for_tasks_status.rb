class AddDefaultValueForTasksStatus < ActiveRecord::Migration[5.0]
  def up
  	change_column :tasks, :status, :boolean, :default => false
  end
end
