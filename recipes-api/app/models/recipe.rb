class Recipe < ApplicationRecord
  validates :name, presence: true
  validates :url, presence: true
  validates :url, uniqueness: true 
  validates :img_url, presence: true
end
