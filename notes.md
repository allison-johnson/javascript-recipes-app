Substance
[x] Migration for notes
    * Recipe has_many notes
    * Note belongs_to recipe
    * Notes listed on recipe card

[x] Form to submit new recipe

[] Clear fields when form is submitted

[] Create an event controller that handles all clicks
    * Listen for clicks at the top level (document)
    * Use switch statements to execute an appropriate callback based on the target element of the click

[] Button to add note to recipe
    * Text box and submit button appear
    * On submit, note gets added to recipe card 
    * On submit, form gets destroyed
    * When add button is clicked, do nothing if parent element's HTML already contains <form>

[] Form to edit a recipe (or a note?)

[] New recipe form only appears on click

[] Add User class; recipe belongs_to user
    * user can 'like' a recipe
    * user has_many liked_recipes

Style
[] Styling of 'add recipe note' buttons
[] New recipe form like in Toy Tale
[] Format ul's (maybe left align li's?)
[] Center grid of cards
[] Play around with existing card templates
[] Limit number of notes that show at once (or allow user to scroll)

Questions
[] How to make text box/submit button appear when new notes button is clicked
[] How to clear values from input boxes once recipe is submitted
[] How to center the entire grid of cards


createForm => function formTemplate(project)

