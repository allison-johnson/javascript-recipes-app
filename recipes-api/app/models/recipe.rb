class Recipe < ApplicationRecord
  has_many :notes
  
  validates :name, presence: true
  validates :url, presence: true
  validates :url, uniqueness: true 
  validates :img_url, presence: true
end
