const mongoose = require("mongoose");

const combinationSchema = new mongoose.Schema({
  // user: {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   username: String,
  // },
  username: String,
  mainNums: [],
  euroNums: [],
  draw: Number,
  isActive: Boolean,
  isLast: Boolean,
  name: String,
  isWinning: Boolean,
});

module.exports = mongoose.model("Combination", combinationSchema);
