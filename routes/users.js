const express = require("express");
const router = express.Router({ mergeParams: true });
const userService = require("../services/userService");
const catchAsync = require("../helpers/catchAsync");
const AppError = require("../helpers/AppError");

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

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json(createdUser);
  })
);

router.put(
  "/:id",
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
