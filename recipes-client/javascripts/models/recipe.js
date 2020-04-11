class Recipe {
  static all = [];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
    this.img_url = data.img_url;
    this.notes = [];
    //this.notes = data.notes; //Or create new Note object for each note?
    let notes = data.notes
    // console.log(notes)
    // debugger 
    // notes.forEach(noteData => new Note(noteData))
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
    //fetch sends a GET request by default
    fetch('http://localhost:3000/api/recipes')
    .then(function(response){
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
    })
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

    fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {
        let recipe = new Recipe(data)
        console.log("New recipe notes: ", recipe.notes)
        recipe.render();
        resetInput();
        // document.getElementById('name').value = ""
        // document.getElementById('url').value = ""
        // document.getElementById('img_url').value = ""
    });
  }//createFromForm 

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
    this.addNotes();

    //Create 'add note' button on the recipe's card
    let addNoteButton = document.createElement('button');
    addNoteButton.class = "btn";
    addNoteButton.classList.add("add-note-btn");
    addNoteButton.innerText = "Add a recipe note";
    addNoteButton.id = `add-note-btn-${this.id}`;
    document.getElementById(`card ${this.id}`).appendChild(addNoteButton);
  }//render

  //Add notes to the recipe's card
  addNotes() {
    let recipeNotes = document.getElementById(`recipe-notes-${this.id}`)
    this.notes.forEach(note => {
        let li = document.createElement('li');
        li.classList.add("recipe-note");
        li.innerHTML = note.content;
        recipeNotes.appendChild(li);
    })
  }//addNotes

  //renders the HTML for ALL recipes
  static renderRecipes() {
    Recipe.all.forEach(recipe => recipe.render());

    //When clicked, button should generate new text field and submit button
    let buttons = getButtons();
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            //Find which recipe object is this getting called on

            //Tried using id to identify recipe, but causes problems when recipes get deleted from db
            // let targetIdArr = e.target.id.split("-");
            // console.log("targetIdArr: ", targetIdArr)

            // let targetRecipeIndex = parseInt(targetIdArr[targetIdArr.length-1])-1;
            // console.log("targetRecipeIndex: ", targetRecipeIndex)

            // let targetRecipe = Recipe.all[targetRecipeIndex]
            // console.log("targetRecipe: ", targetRecipe)

            let targetName = e.target.parentElement.getElementsByTagName('a')[0].innerText;
            console.log("targetName: ", targetName)

            let targetRecipe = Recipe.all.find(recipe => recipe.name === targetName)
            console.log("targetRecipe: ", targetRecipe)
            //debugger

            targetRecipe.renderNoteForm(e);
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

    let allNewNoteForms = document.getElementsByClassName("new-note-form");
    let lastNewNoteForm = allNewNoteForms.item(allNewNoteForms.length-1);
    lastNewNoteForm.addEventListener("submit", function(e){
        e.preventDefault();

        //What recipe to call createNoteFromForm on? 
        //TODO: probably should be a static Note method
        //debugger 
        let targetName = e.target.parentElement.getElementsByTagName('a')[0].innerText;
        let targetRecipe = Recipe.all.find(recipe => recipe.name === targetName)
        targetRecipe.createNoteFromForm(e);
    })
  }//renderNoteForm

  //creates a new recipe note based on the content of a 'new note' form
  createNoteFromForm(e) {
    e.preventDefault();

    //DOM Getters
    let noteContent = e.target.note.value;
    let wordArr = e.target.parentNode.id.split(" ");
    let recipeId = parseInt(wordArr[wordArr.length-1]);

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
    })
    .then(resp => resp.json())
    .then(data => {
        //Add created note to correct recipe on front end
        //console.log("this in .then line 185: ", this)
        let note = new Note(data);
        console.log(note)

        //Add new note to ul for that recipe's card
        let ul = document.getElementById(`recipe-notes-${note.recipe_id}`)
        let li = document.createElement('li');
        li.innerText = note.content;
        ul.appendChild(li);

        //Remove form from DOM
        let newNoteForms = document.getElementsByClassName("new-note-form")
        let mostRecent = newNoteForms[newNoteForms.length-1];
        mostRecent.parentNode.removeChild(mostRecent);
    });
  }//createNoteFromForm



}//class