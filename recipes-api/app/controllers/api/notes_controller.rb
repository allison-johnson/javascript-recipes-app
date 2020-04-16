class Api::NotesController < ApplicationController
  before_action :set_note, only: [:destroy]

  #POST/notes
  def create
    note = Note.new(note_params)
    if note.save
      render json: note, status: :created
    else
      render json: {errors: note.errors}, status: :unprocessable_entity 
    end
  end #create

  #DELETE
  def destroy
    set_note 
    @note.destroy 
    render json: {}, status: :no_content 
  end #destroy

  private
  #Only allow a trusted parameter "white list" through
  def note_params
    params.require(:note).permit(:content, :recipe_id, :id)
  end #note_params

  def set_note
    @note = Note.find_by(id: params[:id])
  end #set_note

end #class