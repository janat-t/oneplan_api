module.exports = app => {
	const plan_season = require("../controllers/plan_season.controller.js");
	app.post("/api/plan_season", plan_season.create);
	app.post("/api/plan_season/:planId/:newPlanId", plan_season.duplicate);
	app.put("/api/plan_season/:planId", plan_season.update);
	app.delete("/api/plan_season/delete/plan/:planId", plan_season.deletePlanId);
	app.delete("/api/plan_season/delete/season/:seasonId", plan_season.deleteSeasonId);
};
