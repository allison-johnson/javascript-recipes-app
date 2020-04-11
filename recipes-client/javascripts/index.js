document.addEventListener('DOMContentLoaded', function() {
  //This should send AJAX request to Rails side to fetch all recipes information
  Recipe.load();
  getForm().addEventListener('submit', Recipe.createFromForm);
})//DOMContentLoaded event listener 

let recipes = [];

//DOM Getters
//Can these be used by js classes?
let getRecipesList = () => document.querySelector('div.recipes-list');
let getForm = () => document.getElementById('recipe-form')
let getName = () => document.getElementById('name').value
let getURL = () => document.getElementById('url').value
let getImgURL = () => document.getElementById('img_url').value
let getButtons = () => document.getElementsByClassName('add-note-btn')

function resetInput() {
  getName().value = '';
  getURL().value = '';
  getImgURL().value = '';
}
