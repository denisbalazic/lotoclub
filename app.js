const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const settingsRoutes = require("./routes/settings");
const usersRoutes = require("./routes/users");
const combinationsRoutes = require("./routes/combinations");
const cron = require("cron");
const { databaseURL, port, secret, jwtSecret } = require("./config");
const Settings = require("./models/settings");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

//Mongo database connection
mongoose
  .connect(databaseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection to db open");
  })
  .catch((err) => {
    console.log("Connection error: ", error);
  });

//Routes
app.use("/api/users", usersRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/combinations", combinationsRoutes);

app.use("*", (req, res) => {
  res.send("Invalid route, please create error page");
});

//Lock editing of combinations on Friday 9:00 AM
const cronJob = new cron.CronJob("0 9 * * 5", async () => {
  console.log("Editing blocked");
  await blockEditingCombinations();
});
cronJob.start();

async function blockEditingCombinations() {
  const settings = await Settings.updateOne({}, { $set: { canEdit: false } });
  console.log(settings);
}

//Start server
app.listen(port, () => {
  console.log("Lotoclub has started");
});
