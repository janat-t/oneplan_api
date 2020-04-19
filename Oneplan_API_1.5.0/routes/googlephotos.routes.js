module.exports = app => {
	const googlephotos = require("../controllers/googlephotos.controller.js");
	app.get("/api/googlephotos/:placeId", googlephotos.findId);
};
