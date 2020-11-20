const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const User = require("../models/user");
const Settings = require("../models/settings");
const Combination = require("../models/combination");

const emptyCombination = {
  mainNums: [],
  euroNums: [],
  isLast: true,
  isWinning: false,
};

router.put("/", async (req, res) => {
  try {
    //update settings with array of combination names to be played in next draw
    const activeCombNames = req.body.activeCombs;
    const settings = await Settings.findOne({});
    settings.draw += 1;
    settings.canEdit = true;
    settings.activeCombs = activeCombNames;
    settings.save();
    //make active combinations inactive
    await Combination.updateMany({ isActive: true }, { isActive: false });
    //find last played combinations for every user
    const users = await User.find({});
    for (const user of users) {
      for (const combName of activeCombNames) {
        const lastComb = await Combination.findOne({
          username: user.username,
          name: combName,
          isLast: true,
        });
        //copy last played combination or create new blank,
        //and mark them active
        let newCombination;
        if (lastComb) {
          newCombination = new Combination(lastComb.toObject());
          lastComb.isLast = false;
          await lastComb.save();
          console.log("old comb");
        } else {
          newCombination = new Combination(emptyCombination);
          newCombination.username = user.username;
          newCombination.name = combName;
          console.log("new comb");
        }
        newCombination._id = mongoose.Types.ObjectId();
        newCombination.isNew = true;
        newCombination.isActive = true;
        newCombination.draw = settings.draw;
        await newCombination.save();
        console.log("save comb");
      }
    }
    res.status(200).send("ok");
  } catch (err) {
    console.log("Error in settings route: ", err);
    res.status(500).send(err);
  }
});

module.exports = router;
