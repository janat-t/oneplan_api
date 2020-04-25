module.exports = app => {
	const response = require("../controllers/response.controller.js");
	app.post("/api/response", response.create);
	app.get("/api/response", response.findAll);
	app.get("/api/response/:responseId", response.findId);
	app.delete("/api/:responseId", response.delete);
};
