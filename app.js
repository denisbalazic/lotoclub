const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	res.send(index);
});

<<<<<<< Updated upstream
=======
app.get("/api/combinations", function(req, res) {
	res.json(combinations);
});

app.post("/api/combinations", function(req, res) {
	res.status(201).json(req.body);
})

>>>>>>> Stashed changes
app.listen(process.env.PORT || 3000, function() {
	console.log("Lotoclub has started");
});