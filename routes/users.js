const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");

router.post("/", (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  newUser.save();
  res.status(201).send();
});

module.exports = router;
