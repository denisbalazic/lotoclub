const express = require("express");
const router = express.Router({ mergeParams: true });
const userService = require("../services/userService");
const combinationService = require("../services/combinationService");
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
    delete req.body.passcode;
    const user = await userService.createUser(req.body);
    const token = await userService.generateAuthToken(user);
    await combinationService.addCombinations(user);
    const response = new ApiResponse(true, { user, token }, null);
    res.status(201).json(response);
  })
);

/**
 * User login
 */
router.post(
  "/login",
  catchAsync(async function (req, res) {
    const user = await userService.login(req.body.username, req.body.password);
    const token = await userService.generateAuthToken(user);
    const response = new ApiResponse(true, { user, token }, null);
    // res.cookie("token", token, { httpOnly: true });
    res.status(200).json(response);
  })
);

/**
 * User logout
 */
router.post(
  "/logout",
  auth.authenticate,
  catchAsync(async function (req, res) {
    req.user.tokens = req.user.tokens.filter(function (token) {
      return token.token !== req.token;
    });
    await req.user.save();
    const response = new ApiResponse(true, null, null);
    res.status(200).json(response);
  })
);

/**
 * Get user that is currently logged in
 */
router.get(
  "/me",
  auth.authenticate,
  catchAsync(async (req, res, next) => {
    // const user = await userService.getUser(req.user.id);
    // if (!user) {
    //   throw new AppError(404, 1, "User not found");
    // }
    const user = req.user;
    const response = new ApiResponse(true, { user }, null);
    res.status(200).json(response);
  })
);

/**
 * Update user that is currently logged in
 * TODO: allow only email and password update (no username?)
 */
router.put(
  "/me",
  auth.authenticate,
  joi.validateUserUpdate,
  catchAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req.user.id, req.body);
    const response = new ApiResponse(true, { updatedUser }, null);
    res.status(200).json(response);
  })
);

/**
 * Get all users
 * TODO: Maybe this should be available only for admin
 */
router.get(
  "/",
  auth.authenticate,
  catchAsync(async (req, res, next) => {
    const users = await userService.getUsers();
    if (!users) {
      throw new AppError(500, 1, "Something went wrong fetching users from db");
    }
    const response = new ApiResponse(true, { users }, null);
    res.status(200).json(response);
  })
);

/**
 * TODO: Only needs to be available only for admin
 */
router.get(
  "/:id",
  auth.authenticate,
  catchAsync(async (req, res, next) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      throw new AppError(404, 1, "User not found");
    }
    const response = new ApiResponse(true, { user }, null);
    res.status(200).json(response);
  })
);

/**
 * TODO: Only for admin
 */
router.delete(
  "/:id",
  auth.authenticate,
  catchAsync(async (req, res, next) => {
    await userService.deleteUser(req.params.id);
    const response = new ApiResponse(true, null, null);
    res.status(200).json(response);
  })
);

module.exports = router;
