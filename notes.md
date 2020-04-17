Day
    - name ("Monday", "Tuesday")
    - seeded (I decide all the records in that table)
    - has_many recipes

Recipe
    - has_many days

DaysRecipes
belongs_to day
belongs_to recipe



MenuItem table
Columns: 
    - day (string; Monday, Tuesday,, ...)
    - recipe_name

{day: "Monday", recipe_name: "bcf"}
{day: "Monday", recipe_name: "salad"}
{day: "Tuesday", recipe_name: "bcf"}


Substance
[] Check that you can add a recipe note to ANY recipe directly after adding a new recipe

[] New table: Days (name:string)
    [x] has_many :recipes
    [x] Recipe has_many :days through recipes_days (likewise with Day and Recipe)
    [] Create DaysController 
    [] Update front end associations, params, etc.
    [x] On page load, load all daily menus from days table
        [x] Create days.js class on frontend 
    [x] Seed data for Days table
    [] When a recipe is dragged into a daily menu, update DOM only with 
    - When 'save' button is clicked, send post request of the form
        strong params = 
        {
            day: {
                name: name
                recipes: {

                }
            }
        }

[] Weekly menu can be saved
    - 'save changes' button clicked
    - iterate over li's
        - send post request to rails
        - if a menu item with that day/recipe_name is not in table, create a new menu item record
            - could also do this using uniqueness validator, but presumably everytime you try to update a weekly menu by saving it, MOST menu items would fail that uniqueness validation, and that seems like a lot of error handling
            - 

[] On page load, load all menu items from MenuItem table and place them in the correct day's recipe list

[] Weekly menu can be cleared with confirmation (deletes all records from MenuItem table and clears those nodes from the DOM)

[] Recipes can be deleted from recipe box (with a confirmation)


Style
[] Daily menus: create cards for these (note paper background with handwriting font would be fun!) -- use flex styling as well
[] Use custom fonts
[] Play around with existing card templates

Stretch Ideas
[] Save daily menus when save button pressed 
[] Add categories and then group recipes by category (maybe a categories sidebar, recipes expand when category hovered over?)
[] Allow user to type notes into a daily menu ("steamed broccoli")
[] Users and user auth
[] Create an event controller that handles all clicks
    * Listen for clicks at the top level (document)
    * Use switch statements to execute an appropriate callback based on the target element of the click

Questions
2. How to clear values from input boxes once recipe is submitted

3. Why can't I call resp.json() in delete fetch request?

3. How to center the entire grid of cards

4. Why can't you attach event listeners iteratively? (i.e., need to wait until ALL delete buttons are created before adding event listeners to ALL of them, rather than attaching the listener to each one right after it is created)

5. How can I turn this into a multi page application? Say, with a nav bar for "recipe box", "weekly menu", etc.? Do you need more than one .html file?

6. Weird issue with which notes are in Note.all array ... think about whether that array is even necessary? I never need to access all the notes, just all the notes of a specific recipe!

