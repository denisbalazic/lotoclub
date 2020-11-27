const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const settingsRoutes = require("./routes/settings");
const usersRoutes = require("./routes/users");
const combinationsRoutes = require("./routes/combinations");
const errorHandler = require("./middleware/errorHandler");
const cron = require("cron");
const { databaseURL, port, secret, jwtSecret } = require("./config");
const cronJob = require("./helpers/cronTimer");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // <-------------------what is this????
app.use(express.json());
app.use(methodOverride("_method"));

/**
 * Connect to Mongo database
 */
mongoose
  .connect(databaseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection to Mongo db open");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo db: ", err);
  });

/**
 * Api routes
 */
app.use("/api/users", usersRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/combinations", combinationsRoutes);

/**
 * Error-handling middleware
 */
app.use(errorHandler.proccessError);

/**
 * Route not found
 */
app.use("*", (req, res) => {
  res.status(404).send("Route doesnt exist, please create 404 page");
});

/**
 * Reccurent blocking of editing combinations on Friday 9:00AM
 * Needs to be unblocked by admin after draw (on Saturday)
 */
cronJob.start();

/**
 * Start server
 */
app.listen(port, () => {
  console.log("Lotoclub has started");
});
