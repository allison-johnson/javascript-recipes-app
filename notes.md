Substance
[] Abstract note functionality out of recipe.js and into a note.js class?

[] Clear fields when form is submitted

[] Create an event controller that handles all clicks
    * Listen for clicks at the top level (document)
    * Use switch statements to execute an appropriate callback based on the target element of the click

[] Button to add note to recipe
    [x] Text box and submit button appear
    [x] On submit, note gets added to recipe card 
    [x] On submit, form gets destroyed
    [] When add button is clicked, do nothing if parent element's HTML already contains <form>

[] Form to edit a recipe (or a note?)

[] New recipe form only appears on click

[] Notes can be deleted?

[] Recipes can be deleted

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

Stretch Ideas

Questions
[] How to make text box/submit button appear when new notes button is clicked
[] How to clear values from input boxes once recipe is submitted
[] How to center the entire grid of cards


createForm => function formTemplate(project)

Inside Javascripts -> models and -> services (anything to do with the API/fetching)
    class Blog
        - constructor (filter out data on API side as well, maybe don't need user_id if it's in the user class)
        - this.user = new User(data.user) if you want to have a user class as well
        - Now you can construct blog objects from index.js
        - move blogs array out of index
        - move template function to Blog class
            prototype function/instance method so it will return a template that represents the data of this instance
            - don't need 'function' keyword

        - static renderBlogs() function (class function, not about one blog)

        - change fetch get request to use Blog class:

            .then{resp => resp.json()}
            .then(data => {
                let blog = new Blog(data)
                blog.render();
                resetInput();
            })
        
        - static createFromForm()
        - static load() (and then call it from index.js inside DOMcontent loaded)
    
    *Services* services -> api.js
    class API {
        //no instance methods because we don't have any instances!
        //everything has class-level scope
        static baseURL = 'http://localhost:3000/api';

        //get data
        static get(url){ 
            //return what we fetch
            return fetch(API.baseURL + url).then(resp => resp.json())
        }

        //post data
        static post(url, data) {
            //data will be strong params
            return fetch(API.baseURL + url, {
                method: 'POST'
                headers: {
                    //blah blah
                },
                body: JSON.stringify(data)
            })
            .then(resp => resp.json())
        }

        //delete data
    }

    *Then in blog.js*:
    static load() {
        API.get('/blogs').then(function(blogs) {
            ...
        })
    }

    //Not sure what function this is in...
    API.post('/blogs', strongParams).then(data => {
        let blog = new Blog(data)
        blog.render();
        resetInput();
    })

    
    
    <script src="javascripts/models/blog.js"></script> inside index.html BEFORE index.js because index needs to know about blog.


Questions
1. [x] Every blog object in the db has a "mirror" in the frontend? Why?
    - Faster (fewer connections to API): in the case of a delete, we can just send delete request as a fetch but load the remaining blogs using the blogs we already have loaded in JS rather than sending *another* fetch request to re-load blogs

2. Are globals efined in index.js viewable in blog.js?

3. What does resetInput() do inside .then?

