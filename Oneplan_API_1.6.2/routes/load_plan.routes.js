module.exports = app => {
	const load_plan = require("../controllers/load_plan.controller.js");
	app.get("/api/load_plan/search", load_plan.searchPlanCriteria, function(req, res) {
	 var planId = req.query.planId;
	 var userId = req.query.username;
	 var cityId = req.query.cityId;
	 var start = req.query.start;
	 var stop = req.query.stop;
	 var budget = req.query.budget;
	 var tags = req.query.tags;
    });
	app.get("/api/load_plan/simple", load_plan.loadSimpleId, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full", load_plan.loadFullId, function(req, res) {
	 var planId = req.query.planId;
    });
};
