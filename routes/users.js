const express = require("express");
const router = express.Router({ mergeParams: true });
const userService = require("../services/userService");
const catchAsync = require("../helpers/catchAsync");
const joi = require("../middleware/joiValidation");
const auth = require("../middleware/auth");
const AppError = require("../helpers/AppError");
const ApiResponse = require("../helpers/ApiResponse");

/**
 * Register, create new user
 */
router.post(
  "/",
  joi.validateUser,
  catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body);
    const token = await userService.generateAuthToken(user);
    const response = new ApiResponse(true, { user, token }, null);
    res.status(201).json(response);
  })
);

/*
 * User login
 */
router.post(
  "/login",
  catchAsync(async function (req, res) {
    const user = await userService.login(req.body.username, req.body.password);
    const token = await userService.generateAuthToken(user);
    const response = new ApiResponse(true, { user, token }, null);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json(response);
  })
);

router.get(
  "/me",
  auth.authenticate,
  catchAsync(async (req, res, next) => {
    const user = await userService.getUser(req.user.id);
    if (!user) {
      throw new AppError(404, 1, "User not found");
    }
    res.status(200).json(user);
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const users = await userService.getUsers();
    if (!users) {
      throw new AppError(500, 1, "Something went wrong fetching users from db");
    }
    res.status(200).json(users);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      throw new AppError(404, 1, "User not found");
    }
    res.status(200).json(user);
  })
);

router.put(
  "/:id",
  joi.validateUserUpdate,
  catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    await userService.deleteUser(req.params.id);
    res.status(200).send();
  })
);

module.exports = router;
