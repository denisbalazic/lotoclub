const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

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

app.get("/", function (req, res) {
  res.send(index);
});

app.get("/api/combinations", function (req, res) {
  res.json(combinations);
});

app.post("/api/combinations", function (req, res) {
  combinations = req.body;
  res.status(201).json(combinations);
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Lotoclub has started");
});
