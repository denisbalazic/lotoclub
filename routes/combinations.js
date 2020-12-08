const express = require("express");
const router = express.Router({ mergeParams: true });
const Combination = require("../models/combination");
const User = require("../models/user");
const Settings = require("../models/settings");
const auth = require("../middleware/auth");
const blockEdit = require("../middleware/blockEdit");
const joi = require("../middleware/joiValidation");
// const expressSession = require("express-session");
const catchAsync = require("../helpers/catchAsync");
const AppError = require("../helpers/AppError");
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
      const foundCombinations = await Combination.find({
        isActive: true,
        user: user,
      });
      const userCombination = {
        username: user.username,
        combinations: foundCombinations,
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
  "/me",
  auth.authenticate,
  catchAsync(async (req, res) => {
    const combinations = await Combination.find({
      user: req.user,
      isActive: true,
    });
    const response = new ApiResponse(true, combinations, null);
    res.json(response);
  })
);

/**
 * Update active combinations for logged user
 */
router.put(
  "/me",
  auth.authenticate,
  blockEdit.check,
  joi.validateCombination,
  catchAsync(async (req, res, next) => {
    const combination = await Combination.findOne({
      user: req.user,
      name: req.body.name,
      isActive: true,
    });
    if (!combination) {
      throw new AppError(400, 1, "No active combination with that name");
    }
    combination.mainNums = req.body.mainNums;
    combination.euroNums = req.body.euroNums;
    await combination.save();
    const response = new ApiResponse(true, combination, null);
    res.status(200).json(response);
  })
);

module.exports = router;
