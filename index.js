// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.use("/api/:date", function (req, res) {
	const params = req.params;
	const dateNum = Number(params.date);
	if (!isNaN(dateNum)) { params.date = dateNum }
	const date = new Date(params.date);
	if (!date.valueOf()) {
		res.json({ error: "Invalid Date" });
	} else {
		res.json({ unix: date.getTime(), utc: date.toUTCString() });
	}
});

app.use("/api/", function (req, res) {
	const date = new Date();
	res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
