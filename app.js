const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const combinationsRoutes = require("./routes/combinations");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

<<<<<<< HEAD
let combinations = [
  {
    mainNums: [2, 5, 19, 27, 36],
    euroNums: [1, 9],
    id: "comb-1",
    name: "Glavna",
  },
  {
    mainNums: [5, 6, 21, 30, 39],
    euroNums: [4, 9],
    id: "comb-2",
    name: "Dodatna",
  },
  {
    mainNums: [5, 11, 23, 36, 42],
    euroNums: [1, 8],
    id: "comb-3",
    name: "Posebna",
  },
];
=======
app.use("/api/combinations", combinationsRoutes);
>>>>>>> routes

app.get("/", function (req, res) {
  res.send(index);
});

app.use("*", (req, res) => {
  res.send("Invalid route, please create error page");
});

<<<<<<< HEAD
app.post("/api/combinations", function (req, res) {
  combinations = req.body;
  res.status(201).json(combinations);
});

app.listen(process.env.PORT || 3000, function () {
=======
app.listen(process.env.PORT || 3000, () => {
>>>>>>> routes
  console.log("Lotoclub has started");
});
