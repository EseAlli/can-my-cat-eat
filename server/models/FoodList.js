const mongoose = require("mongoose");

const FoodListSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  canEat: {
    type: Boolean,
  },
  level: {
    type: String,
    enum: ["Yes", "Moderate"],
  },
  description: {
    type: String,
  },
  tips: {
    type: String,
  },
});

module.exports = mongoose.model("FoodList", FoodListSchema);
