class Project < ActiveRecord::Base
	belongs_to :task
	has_many :task, dependent: :destroy
	validates :name,
			 presence: true, #не пустая строка
			 uniqueness: true, 
			 length: { maximum: 30 }
end
