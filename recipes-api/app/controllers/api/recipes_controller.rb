class Api::RecipesController < ApplicationController
  #Include before_action :set_recipe

  #GET/recipes
  def index
    recipes = Recipe.all 
    render json: recipes, include: [:notes]
  end #index

  #GET/recipes/1
  def show
    recipe = Recipe.find_by(id: params[:id])
    render json: recipe 
  end #show

  #POST/recipes
  def create
    recipe = Recipe.new(recipe_params);
    if recipe.save
      render json: recipe, include: [:notes], status: :created
    else
      render json: recipe.errors, status: :unprocessable_entity
    end
  end #create

  private
  #Only allow a trusted parameter "white list" through
  def recipe_params
    params.require(:recipe).permit(:name, :url, :img_url)
  end #recipe_params


end #class 