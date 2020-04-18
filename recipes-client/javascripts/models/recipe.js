class Recipe {
  static all = [];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
    this.img_url = data.img_url;
    this.notes = [];
    
    let notes = data.notes
    for (let i = 0; i < notes.length; i++) {
      this.notes.push(new Note(notes[i]))
    }//for

    this.save();
  }//constructor

  save() {
    Recipe.all.push(this);
  }//save

  static alphaByName(r1, r2) {
    if (r1.name > r2.name) {
      return 1;
    }
    if (r2.name > r1.name) {
      return -1;
    }
    return 0;
  }

  //sends AJAX call to Rails side to fetch all recipe information
  static load() {
    API.get('/recipes')
    .then(function(recipes){
        recipes.forEach(data => new Recipe(data))
        Recipe.all.sort(Recipe.alphaByName)
        Recipe.renderRecipes();
    })
    .finally(Day.load.bind(Day))
    .catch(errors => console.log(errors))
  }//load

  //creates a new recipe from a form 
  static createFromForm(e) {
    e.preventDefault();

    const name = getName();
    const url = getURL();
    const imgURL = getImgURL();
    //debugger 

    //Formulate strong params to match Rails strong params
    let strongParams = {
        recipe: {
          name: name,
          url: url,
          img_url: imgURL
        }
    };

    //Get returned promise from AJAX call and add recipe to page
    API.post('/recipes', strongParams)
    .then(data => {
        if (data.errors) {
          //Formulate a string from data.errors
          let errorString = "";
          for (const key in data.errors) {
            errorString += `${data.errors[key]}\n`;
          }
          throw new Error(errorString);
        }
        //If there were no errors, add recipe and render note on front end
        let recipe = new Recipe(data)
        recipe.render();
        resetInput();
        Recipe.addListenersToAddNoteButtons();
        Recipe.addListenersToDeleteRecipeButtons();
    })
    .catch((error) => {
      //debugger 
      alert(`${error.toString()}`)
    });
  }//createFromForm (new recipe)

  //returns HTML template for a recipe's card
  template() {
    return `
    <div class="card" id="card ${this.id}" draggable="true">
      <button class="delete-recipe-btn"><i class="fas fa-times"></i></button>
      <div class="card-content">
        <img class="recipe-img" id="recipe-img-${this.id}" src="${this.img_url}" alt="${this.name}"/><br>
        <a href=${this.url} class="card-url">${this.name}</a>
        <ul class="recipe-notes" id="recipe-notes-${this.id}"></ul>
      </div>
    </div>
    `
  }//template

  //renders the HTML for a recipe's card
  render() {
    getRecipesList().innerHTML += this.template();

    //Add notes to the recipe's card
    Note.addNotes(this);

    //Create 'add note' button on the recipe's card
    //Should this get delegated to Note class?
    let addNoteButton = document.createElement('button');
    addNoteButton.class = "btn";
    addNoteButton.classList.add("add-note-btn");
    addNoteButton.innerText = "Add a recipe note";
    addNoteButton.id = `add-note-btn-${this.id}`;
    document.getElementById(`card ${this.id}`).appendChild(addNoteButton);
  }//render (HTML template for recipe's card)

  static addListenersToAddNoteButtons() {
    let addNoteButtons = getAddNoteButtons();
    for (let i = 0; i < addNoteButtons.length; i++) {
      addNoteButtons[i].addEventListener("click", function(e){
        if(!e.target.parentNode.innerHTML.includes("</form>")) {
          Note.renderNoteForm(e);
        }
      })
    }
  }//addListenersToAddNoteButtons 

  static dragstartHandler(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "copy";
  }

  //renders the HTML for ALL recipes
  static renderRecipes() {
    Recipe.all.forEach(recipe => recipe.render());

    Recipe.addListenersToAddNoteButtons();
    Recipe.addListenersToDeleteRecipeButtons();

    //When clicked, button should generate new text field and submit button
    let buttons = getAddNoteButtons();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            //Only render one form, per recipe, at a time
            if(!e.target.parentNode.innerHTML.includes("</form")) {
              Note.renderNoteForm(e);
            }
        })
    }

    //Add dragstart handlers to all recipe cards id="card ${this.id}"
    let allCards = getCards();
    for (let i = 0; i < allCards.length; i++) {
      allCards[i].addEventListener("dragstart", function(e) {
        Recipe.dragstartHandler(e)
      })
    }
  }//renderRecipes

  static addListenersToDeleteRecipeButtons() {
    let deleteRecipeButtons = getdeleteRecipeButtons();
    for (let i = 0; i < deleteRecipeButtons.length; i++) {
      deleteRecipeButtons[i].addEventListener('click', function(e) {
        Recipe.deleteRecipe(e);
      })//addEventListener
    }//for
  }//addListenersToDeleteRecipeButtons

  static deleteRecipe(e) {
    //e is the event corresponding to clicking a 'delete recipe' button
    let result = confirm("Are you sure you want to delete this recipe? This action cannot be undone!");
    if (result) {
      //Find id of the recipe (depending on whether technically clicked on ICON or on BUTTON)
      let parentId = ""
      if (e.target.tagName === "BUTTON") {
        //Button clicked, so parent is the card itself
        parentId = e.target.parentNode.id; 
      } else {
        //Icon clicked, so parent is the button and grandparent is the card
        parentId = e.target.parentNode.parentNode.id; 
      }
      let parentIdArr = parentId.split(" ");
      let recipeId = parentIdArr[1];
      
      //Send delete fetch request to backend
      API.delete(`/recipes/${recipeId}`)
        .then(text => {
          //Remove deleted recipe from DOM
          console.log("then of delete")
          document.getElementById(`card ${recipeId}`).remove();
        })
    }//if
  }//deleteRecipe

}//class