const express = require("express");
const router = express.Router({ mergeParams: true });
const Combination = require("../models/combination");
const User = require("../models/user");
const Settings = require("../models/settings");
const joi = require("../middleware/joiValidation");
// const expressSession = require("express-session");
const catchAsync = require("../helpers/catchAsync");
const AppError = require("../helpers/AppError");
const auth = require("../middleware/auth");
const ApiResponse = require("../helpers/ApiResponse");

/**
 * Get all active combinations
 * sorted by user
 */
router.get(
  "/",
  auth.authenticate,
  catchAsync(async (req, res) => {
    const userCombinations = [];
    const users = await User.find({});
    for (const user of users) {
      const combs = await Combination.find({
        isActive: true,
        username: user.username,
      });
      const userCombination = {
        username: user.username,
        combinations: combs,
      };
      userCombinations.push(userCombination);
    }
    const response = new ApiResponse(true, userCombinations, null);
    res.status(200).json(response);
  })
);

/**
 * Get active combinations for logged user
 */
router.get(
  "/:username",
  catchAsync(async (req, res) => {
    const combinations = await Combination.find({
      username: req.params.username,
      isActive: true,
    });
    res.json(combinations);
  })
);

/**
 * Update active combinations for logged user
 */
router.put(
  "/:username",
  joi.validateCombination,
  catchAsync(async (req, res, next) => {
    const combination = await Combination.findOne({
      username: req.params.username,
      name: req.body.name,
      isActive: true,
    });
    if (!combination) {
      throw new AppError(400, 1, "No active combination with that name");
    }
    combination.mainNums = req.body.mainNums;
    combination.euroNums = req.body.euroNums;
    await combination.save();
    res.status(200).json(combination);
  })
);

module.exports = router;
