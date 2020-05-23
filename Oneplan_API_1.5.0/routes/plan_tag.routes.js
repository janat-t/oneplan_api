module.exports = app => {
	const plan_tag = require("../controllers/plan_tag.controller.js");
	app.post("/api/plan_tag", plan_tag.create);
	app.get("/api/plan_tag/plan/:planId", plan_tag.findPlanId);
	app.get("/api/plan_tag/style/:style", plan_tag.findStyle);
	app.delete("/api/plan_tag/delete/plan/:planId", plan_tag.deletePlanId);
	app.delete("/api/plan_tag/delete/style/:style", plan_tag.deleteStyle);
};
