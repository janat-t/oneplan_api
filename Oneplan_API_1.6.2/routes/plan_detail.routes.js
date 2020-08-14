module.exports = app => {
	const plan_detail = require("../controllers/plan_detail.controller.js");
	app.post("/api/plan_detail", plan_detail.create);
	app.post("/api/plan_detail/:planId/:newPlanId", plan_detail.duplicate);
	app.put("/api/plan_detail/:planId/:order", plan_detail.updateOne);
	app.delete("/api/plan_detail/delete/:planId", plan_detail.deletePlanIdAll);
	app.delete("/api/plan_detail/delete/:planId/:order", plan_detail.deletePlanIdOne);
};
