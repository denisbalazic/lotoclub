const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const AppError = require("../helpers/AppError");
const authObj = {};

/*
 * Check if user is authenticated with jwt,
 * end request and send 401 response if not,
 * store user and token in request to handle it in router
 */
authObj.authenticate = async function (req, res, next) {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedJwt = jwt.verify(token, jwtSecret);
    const user = await User.findOne({
      _id: decodedJwt._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new AppError(401, 9, "You need to be loged in");
    }
    req.user = user;
    req.token = token;
    console.log(`User ${req.user.username} is authenticated with token: ${req.token}`);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authObj;
