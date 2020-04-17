class Api::DaysController < ApplicationController

  #GET/days
  def index
    days = Day.all 
    render json: days, include: [:recipes]
  end #index

end #class