const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const User = require("../models/user");
const Settings = require("../models/settings");
const Combination = require("../models/combination");
const catchAsync = require("../helpers/catchAsync");
const auth = require("../middleware/auth");
const ApiResponse = require("../helpers/ApiResponse");

router.put(
  "/",
  auth.authenticate,
  auth.authorize,
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const newWinnerCombination = new Combination();
    newWinnerCombination.isWinning = true;
    newWinnerCombination.mainNums = req.body.combination.mainNums;
    newWinnerCombination.euroNums = req.body.combination.euroNums;
    newWinnerCombination.save();
    //update settings with array of combination names to be played in next draw
    const activeCombNames = req.body.activeCombs;
    const settings = await Settings.resetNewDraw(activeCombNames);
    //make active combinations inactive
    await Combination.updateMany({ isActive: true }, { isActive: false });
    //find last played combinations for every user
    const users = await User.find({});
    for (const user of users) {
      for (const combName of activeCombNames) {
        const lastComb = await Combination.findOne({
          user: user,
          name: combName,
          isLast: true,
        });
        //create new combination and populate it with last played numbers if such combination exists
        let newCombination = new Combination();
        if (lastComb) {
          newCombination.mainNums = lastComb.mainNums;
          newCombination.euroNums = lastComb.euroNums;
          lastComb.isLast = false;
          await lastComb.save();
        }
        newCombination.user = user;
        newCombination.name = combName;
        newCombination.draw = settings.draw;
        await newCombination.save();
      }
    }
    const response = new ApiResponse(true, null, null);
    res.status(200).json(response);
  })
);

module.exports = router;
