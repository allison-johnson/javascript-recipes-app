class Day {
  //In Rails, a day has_many recipes (through recipes_days)
  static all = [];

  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.recipes = [];

    //Populate the day's recipes array in the front end
    let recipes = data.recipes 
    for (let i = 0; i < data.recipes.length; i++) {
      //Find correct recipe JS object and add it to this day's recipes array
      this.recipes.push(Recipe.all.find(recipe => recipe.name === data.recipes[i].name))
    }//for

    this.save();
  }//constructor

  save() {
    Day.all.push(this);
  }//save 

  //sends AJAX call to Rails side to fetch all day information
  static load() {
    API.get('/days')
    .then(function(days){
        //console.log(days);
        days.forEach(data => {
            new Day(data)
            //console.log("Data: ", data)
        });
    })
    .finally(function() {
        console.log(Day.all)
        Day.renderDays();
    })
    .catch(errors => console.log(errors))
  }//load

  //renders the HTML for ALL days 
  static renderDays() {
    Day.all.forEach(day => day.render());

    //Add dragstart handlers to all li's (to get dragged into trash can)
    let dailyRecipeCards = document.getElementsByClassName("daily-recipes");
    for (let i = 0; i < dailyRecipeCards.length; i++) {
        let ul = dailyRecipeCards[i].querySelector('ul');
        let listItems = ul.children
        for (let j = 0; j < listItems.length; j++) {
            listItems[j].setAttribute("draggable", "true")
            listItems[j].addEventListener("dragstart", function(e) {
                dragstartHandler(e);
            })
        }
    }
  }//renderDays

  render () {
    let dayName = this.name.toLowerCase();
    let menu = document.getElementById(`${dayName}-menu`);
    let recipes = this.recipes;
    
    for (let i = 0; i < this.recipes.length; i++) {
        let li = document.createElement('li');
        li.innerText = this.recipes[i].name;
        li.id = `${menu.id} ${this.recipes[i].name}`
        menu.appendChild(li);
        document.getElementById(`${dayName}-menu`).parentElement.style.overflow = "auto";
    }
  }//render 

  static saveChanges(e) {
    console.log("Inside saveChanges")
    //Iterate over all ul's
    let dailyMenus = document.getElementsByClassName("daily-recipes")

    for (let i = 0; i < dailyMenus.length; i++) {
        let ul = dailyMenus[i].querySelector('ul');

        //This ID also corresponds to ID of the Day record in the DB
        let dayName = ul.id.split("-")[0];
        dayName = dayName.slice(0,1).toUpperCase() + dayName.slice(1);
        let dayId = Day.all.find(day => day.name === dayName).id

        //recipeNames will hold the names of all recipes for that day
        let dailyRecipes = ul.children
        let recipeNames = [];

        //For each ul, create an array of recipe names
        for (let j = 0; j < dailyRecipes.length; j++) {
            recipeNames.push(dailyRecipes[j].innerText);
        }

        //Formulate strong params to match Rails strong params
        let strongParams = {
            day: {
                recipe_names: recipeNames
            }
        }

        console.log("strongParams: ", strongParams)

        //Make patch request to Rails with new recipes array for that day
        API.patch(`/days/${dayId}`, strongParams)
          .then(
            console.log("inside then")
          )
    }//outer for 
  }//saveChanges


}//class