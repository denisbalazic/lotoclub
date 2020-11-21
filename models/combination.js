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
  mainNums: {
    type: [{ type: Number, min: 1, max: 50 }],
  },
  euroNums: {
    type: [{ type: Number, min: 1, max: 10 }],
  },
  draw: Number,
  isActive: Boolean,
  isLast: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    enum: ["comb-1", "comb-2", "comb-3", "comb-4"],
  },
  isWinning: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Combination", combinationSchema);
