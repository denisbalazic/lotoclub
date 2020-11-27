const AppError = require("../helpers/AppError");
const errorHandler = {};

/**
 * TODO: Need to come up with better name for this method
 * TODO: Handle validation and duplicate key errors
 */
errorHandler.proccessError = function (err, req, res, next) {
  if (err.name == "ValidationError") {
    console.log("VALIDATION ERROR FOUND");
  }
  if (err.code === 11000) {
    console.log(`${err.keyValue} already exists in db`);
  }
  const { status = 500, code = 0, message = "Unclassified error" } = err;
  res.status(status).send(`message: ${message}, code: ${code.toString()}`);
  console.log(err);
};

module.exports = errorHandler;
