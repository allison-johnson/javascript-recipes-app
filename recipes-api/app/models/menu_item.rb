class MenuItem < ApplicationRecord

    validates :day, presence: true
    validates :day, inclusion: {in: %w(Monday Tuesday Wednesday Thursday Friday Saturday Sunday)}
    validates :recipe_name, presence: true 

end #class