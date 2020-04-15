Substance
[] Add error catch to enter recipe note form

[] Can't get panes to appear

[] Error handling: when user tries to submit blank note or a recipe that's missing a field...
    * See API class static post method for an attempt

[] Delete note:
    [] Abstract funcitonality into a note.js instance method
        [] Call that method right after a new note gets created (so that you can imediately delete note)
    [] Confirmation before delete note

[] What if image can't render or is invalid?

[] Add a like button to top right corner of card (see toy tale?)

[] Weird issue with which notes are in Note.all array ... think about whether that array is even necessary? I never need to access all the notes, just all the notes of a specific recipe!

[] Clear fields when form is submitted

[] Create an event controller that handles all clicks
    * Listen for clicks at the top level (document)
    * Use switch statements to execute an appropriate callback based on the target element of the click

[] Check that validations work on front end 

[] Recipes can be deleted

Style
[] Use custom fonts
[] Center grid of cards
[] Play around with existing card templates

Stretch Ideas
[] Add categories and then group recipes by category
[] Drag and drop recipes into a box (for now)? Then add a box for each day.

Questions
1. Same thing, when I submit an note, delete button doesn't work right away?

2. How to clear values from input boxes once recipe is submitted

3. Why can't I call resp.json() in delete fetch request?

3. How to center the entire grid of cards

4. Why can't you attach event listeners iteratively? (i.e., need to wait until ALL delete buttons are created before adding event listeners to ALL of them, rather than attaching the listener to each one right after it is created)

5. How can I turn this into a multi page application? Say, with a nav bar for "recipe box", "weekly menu", etc.? Do you need more than one .html file?

