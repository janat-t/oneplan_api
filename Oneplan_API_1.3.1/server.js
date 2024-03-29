const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const app = express();
var cors = require("cors");

app.use(cors());

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/city.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/plan_overview.routes.js")(app);
require("./routes/attraction.routes.js")(app);
require("./routes/country.routes.js")(app);
require("./routes/plan_detail.routes.js")(app);
require("./routes/plan_startday.routes.js")(app);
require("./routes/transport.routes.js")(app);
require("./routes/load_plan.routes.js")(app);
require("./routes/image.routes.js")(app);

const privateKey = fs.readFileSync("/etc/letsencrypt/live/api.oneplan.in.th/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/api.oneplan.in.th/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/api.oneplan.in.th/chain.pem", "utf8");
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// set port, listen for requests

https.createServer(credentials, app).listen(443, () => {
	console.log("HTTPS Server running on port 443");
});

http
	.createServer(function(req, res) {
		res.writeHead(301, { Location: "https://" + req.headers["host"] + req.url });
		res.end();
	})
	.listen(80);
