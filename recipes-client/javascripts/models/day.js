class Day {
  //In Rails, a day has_many recipes (through recipes_days)
  static all = [];

  constructor(data) {
    this.name = data.name;
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


}//class