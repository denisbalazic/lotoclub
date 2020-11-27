const cron = require("cron");
const Settings = require("../models/settings");

async function blockEditingCombinations() {
  await Settings.updateOne({}, { $set: { canEdit: false } });
}

//Lock editing of combinations on Friday 9:00 AM
const cronJob = new cron.CronJob("0 9 * * 5", async () => {
  console.log("Editing blocked");
  await blockEditingCombinations();
});

module.exports = cronJob;
