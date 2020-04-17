class RecipesDay < ApplicationRecord
  belongs_to :recipe 
  belongs_to :day 

  def recipe_name
    Recipe.find_by(id: self.recipe_id).name 
  end #recipe_name

  def day_name
    Day.find_by(id: self.day_id).name 
  end #day_name

end #class