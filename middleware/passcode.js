const AppError = require("../helpers/AppError");
const { passcode } = require("../config");

module.exports = {
  check: (req, res, next) => {
    if (req.body.passcode === passcode) {
      delete req.body.passcode;
      next();
    } else {
      throw new AppError(403, 0, "passcode: incorect");
    }
  },
};
