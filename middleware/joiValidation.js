const Joi = require("joi");
const AppError = require("../helpers/AppError");
const joiObj = {};

function validate(req, schema) {
  const { error } = schema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new AppError(400, 1, msg);
  }
}

joiObj.validateUser = (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().min(6).max(19).required(),
    email: Joi.string().email().lowercase().required(),
  });
  validate(req, userSchema);
  next();
};

joiObj.validateUserUpdate = (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(16),
    password: Joi.string().min(6).max(19),
    email: Joi.string().email().lowercase(),
  });
  validate(req, userSchema);
  next();
};

joiObj.validateCombination = (req, res, next) => {
  const combinationSchema = Joi.object({
    mainNums: Joi.array()
      .items(Joi.number().min(1).max(50))
      .length(5)
      .required(),
    euroNums: Joi.array()
      .items(Joi.number().min(1).max(10))
      .length(2)
      .required(),
    name: Joi.string().valid("comb-1", "comb-2", "comb-3", "comb-4").required(),
  });
  validate(req, combinationSchema);
  next();
};

module.exports = joiObj;
