const AppError = require("../helpers/AppError");

const AppError = require("../helpers/AppError");

module.exports = {
  check: (req, res, next) => {
    if (req.body.passcode === "vjeverica") {
      delete req.body.passcode;
      next();
    } else {
      throw new AppError(403, 0, "passcode: incorect");
    }
  },
};
