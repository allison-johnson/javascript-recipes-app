class Day < ApplicationRecord
  has_many :recipes_days 
  has_many :recipes, through: :recipes_days 

  validates :name, presence: true 

end #class