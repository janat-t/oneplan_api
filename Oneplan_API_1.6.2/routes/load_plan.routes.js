module.exports = app => {
	const load_plan = require("../controllers/load_plan.controller.js");
	app.get("/api/load_plan/search", load_plan.searchPlanCriteria, function(req, res) {
	 var planId = req.query.planId;
	 var userId = req.query.userId;
	 var contributorId = req.query.contributorId
	 var cityId = req.query.cityId;
	 var start = req.query.start;
	 var stop = req.query.stop;
	 var budget = req.query.budget;
	 var tags = req.query.tags;
    });
	app.get("/api/load_plan/simple", load_plan.loadSimpleId, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/overview", load_plan.loadFullOverview, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/location", load_plan.loadFullLocation, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/tag", load_plan.loadFullTag, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/startday", load_plan.loadFullStartday, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/attraction", load_plan.loadFullAttraction, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/review", load_plan.loadFullReview, function(req, res) {
	 var planId = req.query.planId;
    });
	app.get("/api/load_plan/full/transport", load_plan.loadFullTransport, function(req, res) {
	 var planId = req.query.planId;
	});
};
