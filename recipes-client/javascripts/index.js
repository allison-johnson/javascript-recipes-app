document.addEventListener('DOMContentLoaded', function() {
  //This should send AJAX request to Rails side to fetch all recipes information
  getRecipes();
  getForm().addEventListener('submit', createFromForm);
})//DOMContentLoaded event listenter 

let recipes = [];

//DOM Getters
const getRecipesList = () => document.querySelector('div.recipes-list');
const getForm = () => document.getElementById('recipe-form')
const getName = () => document.getElementById('name').value
const getURL = () => document.getElementById('url').value
const getImgURL = () => document.getElementById('img_url').value
//const getRecipeNotesList = () => 

function getRecipes() {
  //fetch sends a GET request by default
  fetch('http://localhost:3000/api/recipes')
  .then(function(response){
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(function(data){
    recipes = data;
    //console.log("Recipes: ", recipes)
    renderRecipes(recipes);
  })
}//getRecipes

function renderRecipes(recipes) {
  recipes.forEach(recipe => renderRecipe(recipe));
}//renderRecipes

function renderRecipe(r) {
  //Add HTML to an individual recipe's card to the recipes-list div
  getRecipesList().innerHTML += template(r);

  //Add recipe notes to that individual recipe's card
  addNotes(r);

  //Create an 'add note' button on that recipe's card
  let addNoteButton = document.createElement('button');
  addNoteButton.class = "btn"
  addNoteButton.innerText = "Add a recipe note"
  addNoteButton.id = r.id
  document.getElementById(`card ${r.id}`).appendChild(addNoteButton);

}//renderRecipe

function template(recipe) {
  return `
    <div class="card" id="card ${recipe.id}">
      <div class="card-content">
        <img class="recipe-img" src="${recipe.img_url}"/><br>
        <a href=${recipe.url} class="card-url">${recipe.name}</a>
        <ul class="recipe-notes" id=${recipe.id}></ul>
      </div>
    </div>
  `
}//template 

function addNotes(recipe) {
  let recipeNotes = document.getElementById(`${recipe.id}`)
  recipe.notes.forEach(note => {
      let li = document.createElement('li');
      li.classList.add("recipe-note");
      li.innerHTML = note.content;
      recipeNotes.appendChild(li);
  })
}//addNotes

function createFromForm(e) {
  /* Formulate strong params as data to match Rails strong params
    Get returned promise from our AJAX call
    Add the recipe to the page */
  e.preventDefault();

  const name = getName();
  const url = getURL();
  const imgURL = getImgURL();

  let strongParams = {
    recipe: {
      name: name,
      url: url,
      img_url: imgURL
    }
  };

  fetch('http://localhost:3000/api/recipes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(strongParams)
  })
  .then(resp => resp.json())
  .then(recipe => {
    recipes.push(recipe);
    renderRecipe(recipe);
    document.getElementById('name').value = ""
    document.getElementById('url').value = ""
    document.getElementById('img_url').value = ""
  });

}//createFromForm