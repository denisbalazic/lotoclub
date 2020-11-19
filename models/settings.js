const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  draw: Number,
  activeCombs: [],
  canEdit: Boolean,
});

module.exports = mongoose.model("Settings", settingsSchema);
