module.exports = app => {
	const imagex = require("../controllers/image.controller.js");
	app.post("/api/image", imagex.create);
	app.get("/api/image/:imageId", imagex.findImageId);
	app.get("/api/image/attraction/:attractionId", imagex.findAttractionId);
	app.put("/api/image/:imageId", imagex.updateId);
	app.delete("/api/image/:imageId", imagex.deleteImageId);
	app.delete("/api/image/attraction/:imageId", imagex.deleteAttractionId);
};
