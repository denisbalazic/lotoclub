const User = require("../models/user");
const AppError = require("../helpers/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const userService = {};

/**
 * Create new user
 * User's password is hashed in mongoose pre middleware
 * (in user model)
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

/*
 * Login user with username and password
 */
userService.login = async function (username, password) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new AppError(401, 6, "Wrong username or/and password");
      //...same err: not to give clue which one is wrong
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(401, 6, "Wrong username or/and password");
      //...same err: not to give clue which one is wrong
    }
    return user;
  } catch (err) {
    throw err;
  }
};

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

/*
 * Generate jwt token for user
 */
userService.generateAuthToken = async function (user) {
  try {
    const token = jwt.sign({ _id: user._id.toString() }, jwtSecret);
    console.log(token);
    user.tokens.push({ token });
    await user.save();
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = userService;
