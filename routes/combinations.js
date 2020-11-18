const express = require("express");
const router = express.Router({ mergeParams: true });
const combinationsDB = require("../helpers/data");

router.get("/", (req, res) => {
  res.json(combinationsDB.getCombinations());
});

router.post("/", function (req, res) {
  //validate incoming object <--------------------------------------!!!!!!!!!!!!!!!!!!
  const comb = combinationsDB.setCombination(req.body);
  res.status(201).json(comb);
});

module.exports = router;
