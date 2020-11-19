const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Combination = require("../models/combination");
const Settings = require("../models/settings");

router.put("/", async (req, res) => {
  try {
    //update settings
    const activeCombs = req.body.activeCombs;
    const settings = await Settings.updateOne(
      {},
      { $set: { canEdit: true, activeCombs: activeCombs } }
    );
    //make active combinations inactive
    const rs = await Combination.updateMany(
      { isActive: true },
      { isActive: false }
    );
    //find last combinations
    const users = await User.find({});
    for (const user of users) {
      const lastCombs = await Combination.find({
        username: user.username,
        isLast: true,
      });
      for (let i = 0; i < activeCombs.length; i++) {
        const newCombination = new Combination(
          lastCombs[i] || {
            mainNums: [],
            euroNums: [],
            username: user.username,
            name: activeCombs[i],
            isLast: true,
          }
        );
        newCombination.isActive = true;
        newCombination.draw = 48; // <------------------------------- need to find draw num!!!!!!!!!!!!
        newCombination.save();
      }
    }

    //create new set of active combinations

    res.status(200).send("ok");
  } catch (err) {
    console.log("Error in settings route: ", err);
    res.status(500).send(err);
  }
});

module.exports = router;
