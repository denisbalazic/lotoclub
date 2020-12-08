const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  draw: Number,
  activeCombs: [],
  canEdit: Boolean,
});

/*
 * Resets settings for new draw
 */
settingsSchema.statics.resetNewDraw = async function (activeCombNames) {
  const settings = await this.findOne({});
  settings.draw += 1;
  settings.canEdit = true;
  settings.activeCombs = activeCombNames;
  settings.save();
  console.log(settings.canEdit);
  return settings;
};

module.exports = mongoose.model("Settings", settingsSchema);
