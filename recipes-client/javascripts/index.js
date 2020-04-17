let addRecipe = false;

document.addEventListener('DOMContentLoaded', function() {
  //This should send AJAX request to Rails side to fetch all recipes information
  //It will also load the daily menus AFTER all recipes have been loaded
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
      //console.log(e.target)

      //Make a copy of the dragged element and give it its own ID
      let nodeCopy = draggableElement.cloneNode(true);
      nodeCopy.id = `new card ${id}`;
      
      //Find recipe name and create a list item with it
      let recipeName = nodeCopy.querySelector('a').innerText;
      let li = document.createElement('li');
      li.innerText = recipeName;
      li.setAttribute("draggable", "true");
      li.classList.add("menu-item");

      //Append the new list item to the selected daily menu
      e.target.querySelector("ul").appendChild(li);
      li.id = `${e.target.querySelector("ul").id} ${recipeName}`;

      //Make scrollbar visible
      e.target.style.overflow = "auto";

      //Define event listener on the recipe li for when it gets dragged (to trash)
      li.addEventListener("dragstart", function(e) {
        dragstartHandler(e);
      })

      e.dataTransfer.clearData();
    })
  }//for

  //Tell trash icons what to do when a recipe li is dragged over
  let trashIcons = getTrashIcons();
  for (let i = 0; i < trashIcons.length; i++) {
    trashIcons[i].addEventListener("dragover", function(e) {
      e.preventDefault();
      e.target.setAttribute("style", "opacity: 1;")
    })
  }//for

  //Tell trash icons what to do when a recipe li is dropped in
  trashIcons = getTrashIcons();
  for (let i = 0; i < trashIcons.length; i++) {
    trashIcons[i].addEventListener("drop", function(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const draggableElement = document.getElementById(id);
      draggableElement.remove();
      e.target.setAttribute("style", "opacity: 0.5;")
      e.dataTransfer.clearData();
    })
  }//for
})//DOMContentLoaded event listener 

function dragstartHandler(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

//DOM Getters
let getRecipesList = () => document.querySelector('div.recipes-list');
let getImages = () => document.getElementsByTagName("img");
let getCards = () => document.getElementsByClassName("card");
let getForm = () => document.getElementById('recipe-form');
let getName = () => document.getElementById('name').value;
let getNameInput = () => document.getElementById('name');
let getURL = () => document.getElementById('url').value;
let getURLInput = () => document.getElementById('url');
let getImgURL = () => document.getElementById('img_url').value;
let getImgURLInput = () => document.getElementById('img_url');
let getAddNoteButtons = () => document.getElementsByClassName('add-note-btn');
let getDays = () => document.getElementsByClassName('daily-recipes');
let getTrashIcons = () => document.getElementsByClassName("fas fa-trash-alt");

function resetInput() {
  getNameInput().value = '';
  getURLInput().value = '';
  getImgURLInput().value = '';
}
