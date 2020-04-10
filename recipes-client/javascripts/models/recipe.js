class Recipe {
  static all = [];

  constructor(data) {
    this.name = data.name;
    this.url = data.url;
    this.img_url = data.img_url;
    this.notes = data.notes;
    this.save();
  }//constructor

  save() {
    Recipe.all.push(this);
  }//save

  //returns HTML template for a recipe's card
  template() {
    return `
    <div class="card" id="card ${this.id}">
      <div class="card-content">
        <img class="recipe-img" src="${this.img_url}"/><br>
        <a href=${recipe.url} class="card-url">${this.name}</a>
        <ul id="recipe-notes-${this.id}"></ul>
      </div>
    </div>
    `
  }//template

  //renders the HTML for a recipe's card
  render() {
    getRecipesList().innerHTML += this.template();
  }//render

  //renders the HTML for ALL recipes
  static renderRecipes() {
    Recipe.all.forEach(recipe => recipe.render());

    //When clicked, button should generate new text field and submit button
    buttons = getButtons();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            renderNoteForm(e);
        })
    }
  }//renderRecipes

  //renders the note form to appear when an 'add note' button is clicked
  renderNoteForm(e) {
    e.target.parentNode.insertAdjacentHTML("beforeend", `
     <form class="new-note-form">
       <label for="note">Enter recipe note: </label>
       <input type="text" name="note">
       <input type="submit" id="submit-note" value=&#10004;>
     </form>
    `);

    allNewNoteForms = document.getElementsByClassName("new-note-form");
    lastNewNoteForm = allNewNoteForms.item(allNewNoteForms.length-1);
    lastNewNoteForm.addEventListener("submit", function(e){
        createNoteFromForm(e);
    })
  }//renderNoteForm

  //creates a new note based on the content of a 'new note' form
  createNoteFromForm(e) {
    e.preventDefault();

    //Formulate strong params
    let strongParams = {
        note: {
          content: noteContent,
          recipe_id: recipeId
        }
    };

    //Fetch request
    fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(strongParams)
    }).then(resp => resp.json())
    .then(note => {
        //Add new note to ul for that recipe's card
        ul = document.getElementById(`recipe-notes-${note.recipe_id}`)
        li = document.createElement('li');
        li.innerText = note.content;
        ul.appendChild(li);

        //Remove form from DOM
        newNoteForms = document.getElementsByClassName("new-note-form")
        mostRecent = newNoteForms[newNoteForms.length-1];
        mostRecent.parentNode.removeChild(mostRecent);
    });

  }//createNoteFromForm


}//class