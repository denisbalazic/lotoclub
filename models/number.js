const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema({
  numType: {
    enum: ["main", "euro"],
  },
  num: Number,
  frequency: Number,
  lastDraw: Number,
  occurency: Number,
});

module.exports = mongoose.model("Number", numberSchema);
