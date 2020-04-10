class Api::NotesController < ApplicationController

  #POST/notes
  def create
    note = Note.new(note_params);
    if note.save
      render json: note, status: :created
    else
      render json: note.errors, status: :unprocessable_entity 
    end
  end #create

  private
  #Only allow a trusted parameter "white list" through
  def note_params
    params.require(:note).permit(:content, :recipe_id)
  end #note_params

end #class