module.exports = app => {
	const attraction_tag = require("../controllers/attraction_tag.controller.js");
	app.post("/api/attraction_tag", attraction_tag.create);
	app.get("/api/attraction_tag/attraction/:attractionId", attraction_tag.findAttractionId);
	app.get("/api/attraction_tag/style/:style", attraction_tag.findStyle);
	app.delete("/api/attraction_tag/delete/attraction/:attractionId", attraction_tag.deleteAttractionId);
	app.delete("/api/attraction_tag/delete/style/:style", attraction_tag.deleteStyle);
};
