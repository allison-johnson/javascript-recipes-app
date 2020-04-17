class Recipe < ApplicationRecord
  has_many :notes
  has_many :recipes_days 
  has_many :days, through: :recipes_days 
  
  validates :name, presence: {message: "Recipe name required"}
  validates :url, presence: {message: "Recipe URL required"}
  validates :url, uniqueness: {message: "Recipe already in database"}
  validates :img_url, presence: {message: "Image URL required"}

  before_validation :make_title_case

  def make_title_case
    wordsArr = self.name.split(" ")
    newWordsArr = wordsArr.map{|word| word.capitalize()}
    self.name = newWordsArr.join(" ")
  end #make_title_case 

end #class
