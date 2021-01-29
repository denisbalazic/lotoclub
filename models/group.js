const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 16,
    trim: true,
  },
  passcode: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 19,
    trim: true,
  },
  activeCombs: [],
});

module.exports = mongoose.model("Group", groupSchema);
