const Settings = require("../models/settings");
const AppError = require("../helpers/AppError");
const blockEdit = {};

blockEdit.check = async function (req, res, next) {
  try {
    const settings = await Settings.findOne({});
    console.log(settings.canEdit);
    if (!settings.canEdit) {
      throw new AppError(403, 8, "Editing combinations blocked till after draw");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = blockEdit;
