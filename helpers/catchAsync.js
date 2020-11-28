/**
 * Handles try/catch block by wrapping async callbacks
 * so we dont have to write try/catch in every route
 * Pass errors to next error handling middleware
 */
module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};
