class Day {
  //In Rails, a day has_many recipes (through recipes_days)
  static all = [];

  constructor(data) {
    this.name = data.name;
    //this.recipes = data.recipes;
    this.recipes = [];
    //debugger 

    //Populate the day's recipes array in the front end
    let recipes = data.recipes 
    for (let i = 0; i < data.recipes.length; i++) {
      //I should be able to just make a copy of the correct recipe from Recipe.all
      this.recipes.push(Recipe.all.find(recipe => recipe.name === data.recipes[i].name))
    }//for
    console.log(`Recipes for ${this.name} in constructor: `, this.recipes)

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

  }//renderDays

  render () {
    let dayName = this.name.toLowerCase();
    let menu = document.getElementById(`${dayName}-menu`);
    let recipes = this.recipes;
    console.log("Day: ", dayName)
    console.log("Recipes: ", this.recipes)
    
    for (let i = 0; i < this.recipes.length; i++) {
        let li = document.createElement('li');
        li.innerText = this.recipes[i].name;
        menu.appendChild(li);
    }
  }//render 


}//class