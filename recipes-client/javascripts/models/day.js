class Day {
  //In Rails, a day has_many recipes (through recipes_days)
  static all = [];

  constructor(data) {
    this.name = data.name;
    this.recipes = [];

    this.save();
  }//constructor

  save() {
    Day.all.push(this);
  }//save 

  //sends AJAX call to Rails side to fetch all day information
  static load() {
    API.get('/days')
  }//load
}//class