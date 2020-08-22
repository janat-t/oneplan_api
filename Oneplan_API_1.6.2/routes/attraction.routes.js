module.exports = app => {
	const attraction = require("../controllers/attraction.controller.js");
	app.post("/api/attraction", attraction.create);
	app.get("/api/attraction", attraction.findAll);
	app.get("/api/attraction/google_id/:placeId", attraction.findGoogleId);
	app.put("/api/attraction/:attractionId", attraction.update);
	app.delete("/api/attraction/:attractionId", attraction.delete);
};
