const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const combinationsRoutes = require("./routes/combinations");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/combinations", combinationsRoutes);

app.get("/", function (req, res) {
  res.send(index);
});

app.use("*", (req, res) => {
  res.send("Invalid route, please create error page");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Lotoclub has started");
});
