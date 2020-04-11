Substance
[] Why is refresh necessary after adding recipe in order to add any notes?

[] Limit number of notes on card
    [] Allow user to type in note even if it's "off" the form
    [] Maybe attach form to a higher-up element than the card?

[] Clear fields when form is submitted

[] New recipe note pops up in different div so that user can always submit a note

[] Create an event controller that handles all clicks
    * Listen for clicks at the top level (document)
    * Use switch statements to execute an appropriate callback based on the target element of the click

[] Button to add note to recipe
    [x] Text box and submit button appear
    [x] On submit, note gets added to recipe card 
    [x] On submit, form gets destroyed
    [] When add button is clicked, do nothing if parent element's HTML already contains <form>

[] Check that validations work on front end 
    [] Add titleCase method to rails Recipe class

[] Form to edit a recipe (or a note?)

[] Button to delete a note

[] Recipes can be deleted

[] Add User class; recipe belongs_to user
    * user can 'like' a recipe
    * user has_many liked_recipes

[] Why can't you attach event listeners iteratively? (i.e., need to wait until ALL delete buttons are created before adding event listeners to ALL of them, rather than attaching the listener to each one right after it is created)

Style
[] Styling of 'add recipe note' buttons
[] New recipe form like in Toy Tale
[] Center grid of cards
[] Play around with existing card templates
[] Limit number of notes that show at once (or allow user to scroll)

Stretch Ideas
[] Add categories and then group recipes by category
[] Drag and drop recipes into a box (for now)? Then add a box for each day.

Questions
1. After submitting new recipe, why do I have to refresh page in order for 'add recipe note' buttons to work???

2. With deleting notes: request gets made to backend, note gets deleted from db:
    * Why does page have to be refreshed in order for that note to disappear? I should be able to load the remaining recipes/notes using the ones we already have loaded in JS rather than sending *another* fetch request, but how?

    * Delete patch requent sent to backend, note deleted from db, what does request return to front end? How does the note automatically get deleted from the Note.all array?

3. How to clear values from input boxes once recipe is submitted

4. How to center the entire grid of cards




