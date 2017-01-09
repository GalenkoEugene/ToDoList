class Task < ActiveRecord::Base
	belongs_to :project
	validates :name, :project_id,
			 presence: true, #не пустая строка
			 length: { maximum: 200 }

	#def left_days
	#  if (task.deadline && !task.status)
	#    write_attribute :left_days, "left "+(task.deadline.to_date - Time.now.to_date).to_i.to_s + " day".pluralize((task.deadline.to_date - Time.now.to_date).to_i)
	#  end 
	#end
end
