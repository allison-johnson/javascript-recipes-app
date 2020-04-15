class Note < ApplicationRecord
  belongs_to :recipe

  validates :content, presence: {message: "Note content required"}
end #class