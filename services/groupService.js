const Group = require("../models/group");
const AppError = require("../helpers/AppError");
const groupService = {};

groupService.createGroup = async function (user) {
  try {
    const newGroup = new Group(user);
    const createdGroup = await newGroup.save();
    return createdGroup;
  } catch (err) {
    throw err;
  }
};

module.exports = groupService;
