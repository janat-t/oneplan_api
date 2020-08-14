module.exports = app => {
	const plan_tag = require("../controllers/plan_tag.controller.js");
	app.post("/api/plan_tag", plan_tag.create);
	app.delete("/api/plan_tag/delete/plan/:planId", plan_tag.deletePlanId);
	app.delete("/api/plan_tag/delete/style/:style", plan_tag.deleteStyle);
};
