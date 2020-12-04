const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/combinations", (req, res) => {
  res.render("combinations");
});

router.get("/mycombinations", (req, res) => {
  res.render("mycombinations");
});

router.get("/table", (req, res) => {
  res.render("table");
});

module.exports = router;
