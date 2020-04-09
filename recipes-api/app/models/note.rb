class Note < ApplicationRecord
  belongs_to :recipe

  validates :content, presence: true
end #class