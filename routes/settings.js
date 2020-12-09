const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const User = require("../models/user");
const Settings = require("../models/settings");
const Combination = require("../models/combination");
const catchAsync = require("../helpers/catchAsync");
const auth = require("../middleware/auth");
const ApiResponse = require("../helpers/ApiResponse");
const combinationService = require("../services/combinationService");

router.put(
  "/",
  auth.authenticate,
  auth.authorize,
  catchAsync(async (req, res, next) => {
    //add winning combination to db
    await combinationService.addWinner(req.body.combination);
    //update settings with array of combination names to be played in next draw
    const settings = await Settings.resetNewDraw(req.body.activeCombs);
    //Create new empty combinations for every user
    await combinationService.createCombinationsForNewDraw();
    const response = new ApiResponse(true, null, null);
    res.status(200).json(response);
  })
);

module.exports = router;
