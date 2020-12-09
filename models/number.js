const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema({
  numType: {
    type: String,
    enum: ["main", "euro"],
  },
  num: Number,
  frequency: Number,
  freqTag: Boolean,
  lastDraw: Number,
  drawTag: Boolean,
  occurrence: Number,
  occurrTag: Boolean,
});

module.exports = mongoose.model("Number", numberSchema);
