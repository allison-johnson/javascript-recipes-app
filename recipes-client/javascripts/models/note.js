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
        targetRecipe.createNoteFromForm(e);
    })
  }//renderNoteForm

}//class Note