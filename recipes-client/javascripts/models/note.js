class Note {
  static all = [];

  constructor(data) {
    this.id = data.id; 
    this.content = data.content;
    this.recipe_id = data.recipe_id;
    this.save();
  }//constructor

  save() {
    Note.all.push(this);
  }//save

  //Add recipe's notes to its card (static b/c not an instance method)
  static addNotes(recipe) {
    let recipeNotes = document.getElementById(`recipe-notes-${recipe.id}`);
    recipe.notes.forEach(note => {
        let li = document.createElement('li');
        li.classList.add("recipe-note");
        li.innerHTML = note.content;
        recipeNotes.appendChild(li);

        //Add a delete button to the note
        let deleteNoteButton = document.createElement('button');
        deleteNoteButton.classList.add("delete-button");
        deleteNoteButton.innerHTML = `&#x274C`;
        li.appendChild(deleteNoteButton)
    })

    //Attach event listeners to all deleteNoteButtons
    let buttons = document.getElementsByClassName("delete-button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(e){
        //Find id of the note
        let noteContent = e.target.parentElement.innerText;
        let noteContentLen = noteContent.length; 
        noteContent = noteContent.slice(0, noteContentLen-1);
        //debugger 
        let noteId = Note.all.find(note => note.content === noteContent).id;

        //Send delete fetch request to backend
        console.log("sending delete fetch request")
        fetch(`http://localhost:3000/api/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(function(res) {
          if (res.ok) {
            return Promise.resolve('Note deleted.')
          }
          else {
            return Promise.reject('An error occurred.')
          }
        })
        .then(data => console.log(data));

        //Note deleted from frontend and DOM only on page refresh...

      })//addEventListener
    }//for

  }//addNotes

  static renderNoteForm(e) {
    //e.target.parentNode
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

        let targetName = e.target.parentElement.getElementsByTagName('a')[0].innerText;
        let targetRecipe = Recipe.all.find(recipe => recipe.name === targetName)
        
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

    API.post('/notes', strongParams)
    .then(data => {
        //Add created note to correct recipe on front end
        let note = new Note(data);
        Recipe.all.find(recipe => recipe.id === note.recipe_id).notes.push(note);

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