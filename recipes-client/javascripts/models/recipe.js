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

    // fetch('http://localhost:3000/api/recipes', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(strongParams)
    // })
    // .then(resp => resp.json())
    API.post('/recipes', strongParams)
    .then(data => {
        let recipe = new Recipe(data)
        recipe.render();
        resetInput();
    });
  }//createFromForm (new recipe)

  //returns HTML template for a recipe's card
  template() {
    return `
    <div class="card" id="card ${this.id}">
      <div class="card-content">
        <img class="recipe-img" src="${this.img_url}"/><br>
        <a href=${this.url} class="card-url">${this.name}</a>
        <ul id="recipe-notes-${this.id}"></ul>
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
    let buttons = getButtons();
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            Note.renderNoteForm(e);
        })
    }
  }//renderRecipes

}//class