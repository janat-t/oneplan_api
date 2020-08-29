module.exports = app => {
	const attraction_recommended = require("../controllers/attraction_recommended.controller.js");
	app.post("/api/attraction_recommended", attraction_recommended.create);
	app.get("/api/attraction_recommended", attraction_recommended.findAll);
	app.get("/api/attraction_recommended", attraction_recommended.findCityId, function(req, res) {
	 var cityId = req.query.cityId;
    });
};
