const AppError = require("../helpers/AppError");
const ApiResponse = require("../helpers/ApiResponse");
const errorHandler = {};

/**
 * TODO: Need to come up with better name for this method
 * TODO: Handle validation and duplicate key errors
 */
errorHandler.proccessError = function (err, req, res, next) {
  //Errors from mongoose
  if (err.name === "ValidationError") {
    err.code = 2;
    err.status = 400;
  }
  //Errors from mongoDB
  if (err.code === 11000) {
    err.code = 3;
    err.status = 400;
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    err.message = `"${field}: ${value}" already exists in db`;
  }
  //Error authenticating user (user is not loged in)
  if (err.message === "invalid token") {
    err.code = 9;
    err.status = 401;
  }
  const { status = 500, code = 0, message = "Something went wrong" } = err;
  const appError = new AppError(status, code, message);
  const response = new ApiResponse(false, null, appError);
  res.status(status).json(response);
  console.dir(err);
};

module.exports = errorHandler;
