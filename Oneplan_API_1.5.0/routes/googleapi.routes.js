module.exports = app => {
	const googleapi = require("../controllers/googleapi.controller.js");
	app.get("/api/googleplace/:placeId", googleapi.findId);
	app.get("/api/googlenearby", googleapi.findNearby);
	app.get("/api/googlephoto/:placeId", googleapi.findPhotoId);
	app.get("/api/googlephotos/:placeId", googleapi.findPhotosId);
	app.get("/api/googletransport/:originPlaceId/:destinationPlaceId", googleapi.transport);
};
