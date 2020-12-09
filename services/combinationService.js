const User = require("../models/user");
const Combination = require("../models/combination");
const Settings = require("../models/settings");
const AppError = require("../helpers/AppError");
const combinationService = {};

/**
 * Create empty active combinations for newly created user
 */
combinationService.addCombinations = async function (user) {
  const settings = await Settings.findOne({});
  for (const comb of settings.activeCombs) {
    const newCombination = new Combination();
    newCombination.user = user;
    newCombination.username = user.username;
    newCombination.name = comb;
    newCombination.draw = settings.draw;
    newCombination.save();
  }
};

/**
 * Add winning combination
 */
combinationService.addWinner = async function (combination) {
  const newWinnerCombination = await new Combination();
  newWinnerCombination.isWinning = true;
  newWinnerCombination.mainNums = combination.mainNums;
  newWinnerCombination.euroNums = combination.euroNums;
  await newWinnerCombination.save();
};

/**
 * Create new empty combinations on draw reset
 * for every user
 */
combinationService.createCombinationsForNewDraw = async function () {
  const settings = await Settings.findOne({});
  //make active combinations inactive
  await Combination.updateMany({ isActive: true }, { isActive: false });
  const users = await User.find({});
  for (const user of users) {
    //find last played combinations that are going to be played in new draw
    for (const combName of settings.activeCombs) {
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
};

module.exports = combinationService;
