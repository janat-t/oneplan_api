module.exports = app => {
	const googleapi = require("../controllers/googleapi.controller.js");
	app.get("/api/googleplace/:placeId", googleapi.findId);
	app.get("/api/googlephoto/:placeId", googleapi.findPhotoId);
};
