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

  //Define recipe drop zones
  let days = getDays();
  for (let i = 0; i < days.length; i++) {
    days[i].addEventListener("dragover", function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    })
  }//for

  //Define what should happen when recipe gets "dropped" in
  for (let i = 0; i < days.length; i++) {
    days[i].addEventListener("drop", function(e) {
      e.preventDefault();

      //Get element that was dragged
      const id = e.dataTransfer.getData("text/plain");
      const draggableElement = document.getElementById(id);

      //Get element where it's being dropped
      const dropzone = e.target;
      console.log(e.target)

      //Make a copy of the dragged element and give it its own ID
      let nodeCopy = draggableElement.cloneNode(true);
      nodeCopy.id = `new card ${id}`;
      
      //Find recipe name and create a list item with it
      let recipeName = nodeCopy.querySelector('a').innerText
      let li = document.createElement('li')
      li.innerText = recipeName

      //Append the new list item to the selected daily menu
      e.target.querySelector("ul").appendChild(li);
      e.dataTransfer.clearData();
    })
  }//for

})//DOMContentLoaded event listener 

//let recipes = [];

//DOM Getters
//Can these be used by js classes?
let getRecipesList = () => document.querySelector('div.recipes-list');
let getImages = () => document.getElementsByTagName("img");
let getCards = () => document.getElementsByClassName("card");
let getForm = () => document.getElementById('recipe-form')
let getName = () => document.getElementById('name').value
let getURL = () => document.getElementById('url').value
let getImgURL = () => document.getElementById('img_url').value
let getAddNoteButtons = () => document.getElementsByClassName('add-note-btn')
let getDays = () => document.getElementsByClassName('daily-recipes')

function resetInput() {
  getName().value = '';
  getURL().value = '';
  getImgURL().value = '';
}
