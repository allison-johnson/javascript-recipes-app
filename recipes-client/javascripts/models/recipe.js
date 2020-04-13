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

  //sends AJAX call to Rails side to fetch all recipe information
  static load() {
    API.get('/recipes')
    .then(function(recipes){
        recipes.forEach(data => new Recipe(data))
        Recipe.renderRecipes();
    })
    .catch(errors => console.log(errors))
  }//load

  //creates a new recipe from a form 
  static createFromForm(e) {
    e.preventDefault();

    const name = getName();
    const url = getURL();
    const imgURL = getImgURL();

    //Formulate strong params to match Rails storng params
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
        let recipe = new Recipe(data)
        recipe.render();
        resetInput();
    })
    .catch((error) => {
      alert('Error:', error)
    });
  }//createFromForm (new recipe)

  //returns HTML template for a recipe's card
  template() {
    return `
    <div class="card" id="card ${this.id}">
      <div class="card-content">
        <img class="recipe-img" src="${this.img_url}"/><br>
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

  //renders the HTML for ALL recipes
  static renderRecipes() {
    Recipe.all.forEach(recipe => recipe.render());

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
  }//renderRecipes

}//class