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

module.exports = combinationService;
