class MenuItem < ApplicationRecord

    validates :day, presence: true
    validates :day, inclusion: {in: %w(Monday Tuesday Wednesday Thursday Friday Saturday Sunday)}
    validates :recipe_name, presence: true 

    #validate uniqueness of day/recipe_name combination? For now, just check manually...

end #class