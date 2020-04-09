document.addEventListener('DOMContentLoaded', function() {
  //This should send AJAX request to Rails side to fetch all recipes information
  getRecipes();
})//DOMContentLoaded event listenter 

let recipes = [];
const getRecipesList = () => document.querySelector('div.recipes-list');

function getRecipes() {
  //fetch sends a GET request by default
  fetch('http://localhost:3000/api/recipes')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    recipes = data;
    console.log("Recipes: ", recipes)
    renderRecipes(recipes);
  })
}//getRecipes

function renderRecipes(recipes) {
//   console.log("Inside renderRecipes updated")
//   console.log(recipes)
  recipes.forEach(recipe => renderRecipe(recipe));
}//renderRecipes

function renderRecipe(r) {
  getRecipesList().innerHTML += template(r);
}//renderRecipe

function template(recipe) {
  return `
    <div class="card">
      <div class="card-content">
        <img class="recipe-img" src="${recipe.img_url}"/><br>
        <a href=${recipe.url} class="card-url">${recipe.name}</a>
      </div>
    </div>
  `
}//template 