class Note {
  static all = [];

  constructor(data) {
    this.id = data.id; 
    this.content = data.content;
    this.recipe_id = data.recipe_id;
  }//constructor

  //Add recipe's notes to its card (static b/c not an instance method)
  static addNotes(recipe) {
    let recipeNotes = document.getElementById(`recipe-notes-${recipe.id}`);
    recipe.notes.forEach(note => {
        let li = document.createElement('li');
        li.classList.add("recipe-note");
        li.innerHTML = note.content;
        recipeNotes.appendChild(li);
    })
  }//addNotes

  static renderNoteForm(e) {
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
        
        //make this a static Note method 
        Note.createNoteFromForm(e);
    })
  }//renderNoteForm

  //creates note from form content and adds it to the correct recipe on front end
  static createNoteFromForm(e) {
    e.preventDefault();

    //DOM Getters
    let targetName = e.target.parentElement.getElementsByTagName('a')[0].innerText;
    let targetRecipe = Recipe.all.find(recipe => recipe.name === targetName);
    let recipeId = targetRecipe.id;
    let noteContent = e.target.note.value;

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
        let note = new Note(data);
        //debugger 
        Recipe.all.find(recipe => recipe.id === note.recipe_id).notes.push(note);
        //console.log(note);

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

}//class Note