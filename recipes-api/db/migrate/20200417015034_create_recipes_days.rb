class CreateRecipesDays < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes_days do |t|
      t.integer :recipe_id
      t.integer :day_id
    end
  end
end
