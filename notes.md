Substance
[] Weird issue with which notes are in Note.all array ... think about whether that array is even necessary? I never need to access all the notes, just all the notes of a specific recipe!

[] New recipe form like in Toy Tale

[] Error handling: when user tries to submit blank note or a recipe that's missing a field...

[] Delete button should appear as soon as recipe note is submitted (no refresh button needed!)

[] Why is refresh necessary after adding recipe in order to add any notes?

[] Clear fields when form is submitted

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

[] Recipes can be deleted

Style
[] Use custom fonts
[] Center grid of cards
[] Play around with existing card templates

Stretch Ideas
[] Add categories and then group recipes by category
[] Drag and drop recipes into a box (for now)? Then add a box for each day.

Questions
1. After submitting new recipe, why do I have to refresh page in order for 'add recipe note' buttons to work???

2. How to clear values from input boxes once recipe is submitted

3. How to center the entire grid of cards

4. Why can't you attach event listeners iteratively? (i.e., need to wait until ALL delete buttons are created before adding event listeners to ALL of them, rather than attaching the listener to each one right after it is created)




box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19); 