const express = require("express");
const router = express.Router({ mergeParams: true });
const combinationsDB = require("../helpers/data");
const Combination = require("../models/combination");
const Settings = require("../models/settings");

router.get("/:username", async (req, res) => {
  try {
    const combinations = await Combination.find({
      username: req.params.username,
      isActive: true,
    });
    res.json(combinations);
    // res.json(combinationsDB.getCombinations());
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/:username", async (req, res) => {
  try {
    //validate incoming object <--------------------------------------!!!!!!!!!!!!!!!!!!
    const newCombination = await Combination.findOne({
      username: req.params.username,
      name: req.body.name,
    });
    newCombination.mainNums = req.body.mainNums;
    newCombination.euroNums = req.body.euroNums;
    newCombination.save();
    res.status(201).json(newCombination);
    // const comb = combinationsDB.setCombination(req.body);
    // res.status(201).json(comb);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
