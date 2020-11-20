const express = require("express");
const router = express.Router({ mergeParams: true });
const Combination = require("../models/combination");
const User = require("../models/user");
const Settings = require("../models/settings");

//get all active combinations
router.get("/", async (req, res) => {
  try {
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
    res.status(200).send(userCombinations);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//get active combinations for logged user
router.get("/:username", async (req, res) => {
  try {
    const combinations = await Combination.find({
      username: req.params.username,
      isActive: true,
    });
    res.json(combinations);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Update active combination for logged user
router.put("/:username", async (req, res) => {
  try {
    //validate incoming object <--------------------------------------!!!!!!!!!!!!!!!!!!
    const combination = await Combination.findOne({
      username: req.params.username,
      name: req.body.name,
      isActive: true,
    });
    combination.mainNums = req.body.mainNums;
    combination.euroNums = req.body.euroNums;
    combination.save();
    res.status(200).json(combination);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
