let addRecipe = false;

document.addEventListener('DOMContentLoaded', function() {
  //This should send AJAX request to Rails side to fetch all recipes information
  Recipe.load();
  getForm().getElementsByClassName("btn")[0].addEventListener('click', Recipe.createFromForm);

  const addBtn = document.querySelector("#new-recipe-btn");
  const recipeForm = document.querySelector("#recipe-form");
  addBtn.addEventListener("click", () => {
    addRecipe = !addRecipe;
    if (addRecipe) {
      recipeForm.style.display = "block";
    } else {
      recipeForm.style.display = "none";
    }
  });
})//DOMContentLoaded event listener 

//let recipes = [];

//DOM Getters
//Can these be used by js classes?
let getRecipesList = () => document.querySelector('div.recipes-list');
let getForm = () => document.getElementById('recipe-form')
let getName = () => document.getElementById('name').value
let getURL = () => document.getElementById('url').value
let getImgURL = () => document.getElementById('img_url').value
let getAddNoteButtons = () => document.getElementsByClassName('add-note-btn')

function resetInput() {
  getName().value = '';
  getURL().value = '';
  getImgURL().value = '';
}
