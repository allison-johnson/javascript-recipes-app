class Recipe {
  static all = [];

  constructor(data) {
    this.name = data.name;
    this.url = data.url;
    this.img_url = data.img_url;
    this.notes = data.notes;
    this.save();
  }//constructor

  save() {
    Recipe.all.push(this);
  }
}//class