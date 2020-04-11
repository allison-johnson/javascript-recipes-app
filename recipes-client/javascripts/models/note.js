class Note {
  static all = [];

  constructor(data) {
    this.id = data.id; 
    this.content = data.content;
    this.recipe_id = data.recipe_id;
  }//constructor

  //Add recipe's notes to its card
  //called on Note.class 
  static addNotes(recipe) {
    let recipeNotes = document.getElementById(`recipe-notes-${recipe.id}`);
    recipe.notes.forEach(note => {
        let li = document.createElement('li');
        li.classList.add("recipe-note");
        li.innerHTML = note.content;
        recipeNotes.appendChild(li);
    })
  }//addNotes

}