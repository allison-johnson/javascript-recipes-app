Substance
[] DOM getter for UL's

[] Alphabetize recipes

[] Weird console TypeErrors when recipe dragged into trash bin

[] Weekly menu can be cleared with confirmation (deletes all records from MenuItem table and clears those nodes from the DOM)

[] Recipes can be deleted from recipe box (with a confirmation)


Style
[] Daily menus: create cards for these (note paper background with handwriting font would be fun!) -- use flex styling as well
[] Use custom fonts
[] Play around with existing card templates

Stretch Ideas
[] Add categories and then group recipes by category (maybe a categories sidebar, recipes expand when category hovered over?)
[] Allow user to type (or drag) notes into a daily menu ("steamed broccoli")
[] Create an event controller that handles all clicks
    * Listen for clicks at the top level (document)
    * Use switch statements to execute an appropriate callback based on the target element of the click

Questions
3. Why can't I call resp.json() in delete fetch request?

4. Why can't you attach event listeners iteratively? (i.e., need to wait until ALL delete buttons are created before adding event listeners to ALL of them, rather than attaching the listener to each one right after it is created)

5. How can I turn this into a multi page application? Say, with a nav bar for "recipe box", "weekly menu", etc.? Do you need more than one .html file?


