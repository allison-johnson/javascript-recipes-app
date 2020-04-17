class Api::MenuItemsController < ApplicationController
  before_action :set_menu_item, only: [:destroy]

  #POST/menu_items
  def create
    menu_item = MenuItem.new(menu_item_params)
    if menu_item.save
      render json: menu_item, status: :created
    else
      render json: {errors: menu_item.errors}, status: :unprocessable_entity
    end
  end #create

  #Will need an update action??? Maybe not...

  #DELETE
  def destroy
    set_menu_item
    @menu_item.destroy 
    render json: {}, status: :no_content
  end #destroy

  private
  #Only allow a trusted parameter "white list" through
  def menu_item_params
    params.require(:menu_item).permit(:day, :recipe_name)
  end #menu_item_params

  def set_menu_item
    @menu_item = MenuItem.find_by(id: params[:id])
  end #set_menu_item

end #class