module.exports = app => {
	const plan_location = require("../controllers/plan_location.controller.js");
	app.post("/api/plan_location", plan_location.create);
	app.post("/api/plan_location/:planId/:newPlanId", plan_location.duplicate);
	app.get("/api/plan_location/plan/:planId", plan_location.findPlanId);
	app.get("/api/plan_location/city/:cityId", plan_location.findCityId);
	app.delete("/api/plan_location/delete/plan/:planId", plan_location.deletePlanId);
	app.delete("/api/plan_location/delete/city/:cityId", plan_location.deleteCityId);
};
