class AddDefaultDays < ActiveRecord::Migration[6.0]
  def change
    Day.create(name: "Monday")
    Day.create(name: "Tuesday")
    Day.create(name: "Wednesday")
    Day.create(name: "Thursday")
    Day.create(name: "Friday")
    Day.create(name: "Saturday")
    Day.create(name: "Sunday")
  end
end
