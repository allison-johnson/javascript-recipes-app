class Api::RecipesController < ApplicationController
  #Include before_action :set_recipe

  #GET/recipes
  def index
    recipes = Recipe.all 
    render json: recipes 
  end #index

  #GET/recipes/1
  def show
    recipe = Recipe.find_by(id: params[:id])
    render json: recipe 
  end


end #class 