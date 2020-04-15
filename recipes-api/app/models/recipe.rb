class Recipe < ApplicationRecord
  has_many :notes
  
  #validates :name, presence: true
  validates :name, presence: {message: "required field"}
  validates :url, presence: true
  validates :url, uniqueness: true 
  validates :img_url, presence: true

  before_validation :make_title_case

  def make_title_case
    wordsArr = self.name.split(" ")
    newWordsArr = wordsArr.map{|word| word.capitalize()}
    self.name = newWordsArr.join(" ")
  end

end
