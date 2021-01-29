const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth");
const joi = require("../middleware/joiValidation");
const groupService = require("../services/groupService");
const catchAsync = require("../helpers/catchAsync");
const AppError = require("../helpers/AppError");
const ApiResponse = require("../helpers/ApiResponse");

router.post(
  "/",
  // auth.authenticate,
  joi.validateGroup,
  catchAsync(async (req, res, next) => {
    const group = await groupService.createGroup(req.body);
    const response = new ApiResponse(true, group, null);
    res.status(200).json(response);
  })
);

module.exports = router;
