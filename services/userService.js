const User = require("../models/user");
const AppError = require("../helpers/AppError");
const userService = {};

/**
 * Get all users
 */
userService.getUsers = async function () {
  try {
    const foundUsers = await User.find({});
    return foundUsers;
  } catch (err) {
    throw err;
  }
};

/**
 * Get user by mongoDB id
 * @param {number} id - index number in mongoDB
 */
userService.getUser = async function (id) {
  try {
    const foundUser = await User.findById(id);
    return foundUser;
  } catch (err) {
    throw err;
  }
};

/**
 * Create new user
 */
userService.createUser = async function (user) {
  try {
    const newUser = new User(user);
    const createdUser = await newUser.save();
    return createdUser;
  } catch (err) {
    throw err;
  }
};

/**
 *
 */
userService.updateUser = async function (id, user) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (err) {
    throw err;
  }
};

userService.deleteUser = async function (id) {
  try {
    await User.findByIdAndDelete(id);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = userService;
