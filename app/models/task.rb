class Task < ActiveRecord::Base
	belongs_to :project
	has_one :project
	validates :name,
			 presence: true, #не пустая строка
			 uniqueness: true, 
			 length: { maximum: 130 }
end
