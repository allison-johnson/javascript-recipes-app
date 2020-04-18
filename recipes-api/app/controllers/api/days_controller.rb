class Api::DaysController < ApplicationController

  #GET/days
  def index
    days = Day.all 
    render json: days, include: [:recipes]
  end #index

  #PATCH/PUT /days/1
  def update
    set_day 
    @day.recipes = []
    params[:day][:recipe_names].each do |recipe_name|
      @day.recipes << Recipe.find_by(name: recipe_name)
    end
    #binding.pry 

    if @day.save
      render json: @day
    else
      render json: @day.errors, status: :unprocessable_entity
    end
  end #update

  private
  def set_day
    @day = Day.find_by(id: params[:id])
  end #set)day

  def day_params
    params.require(:day).permit(:name, :recipe_names)
  end #day_params

end #class