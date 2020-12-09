const express = require("express");
const router = express.Router({ mergeParams: true });
const Number = require("../models/number");
const catchAsync = require("../helpers/catchAsync");
const auth = require("../middleware/auth");
const ApiResponse = require("../helpers/ApiResponse");

router.get(
  "/",
  auth.authenticate,
  catchAsync(async (req, res, next) => {
    const numbers = await Number.find({});
    const response = new ApiResponse(true, numbers, null);
    res.status(200).json(response);
  })
);

module.exports = router;
