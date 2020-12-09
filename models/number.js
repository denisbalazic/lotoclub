const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema({
  numType: {
    type: String,
    enum: ["main", "euro"],
  },
  num: Number,
  frequency: Number,
  lastDraw: Number,
  occurency: Number,
});

module.exports = mongoose.model("Number", numberSchema);
