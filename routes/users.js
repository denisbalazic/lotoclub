const express = require("express");
const router = express.Router({ mergeParams: true });
const userService = require("../services/userService");
const AppError = require("../helpers/AppError");

/**
 * Handles try/catch block by wrapping async callbacks
 * so we dont have to write try/catch in every route
 * Pass errors to next error handling middleware
 */
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const users = await userService.getUsers();
    if (!users) {
      throw new AppError(500, 1, "Something went wrong fetching users from db");
    }
    res.status(200).json(users);
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      throw new AppError(404, 1, "User not found");
    }
    res.status(200).json(user);
  })
);

router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json(createdUser);
  })
);

router.put(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    await userService.deleteUser(req.params.id);
    res.status(200).send();
  })
);

module.exports = router;
