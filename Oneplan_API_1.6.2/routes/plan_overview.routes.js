module.exports = app => {
  const plan_overview = require("../controllers/plan_overview.controller.js");
  app.post("/api/plan_overview", plan_overview.create);
  app.post("/api/plan_overview/:planId/:userId", plan_overview.duplicate);
  app.put("/api/plan_overview/:planId", plan_overview.update);
  app.delete("/api/plan_overview/:planId", plan_overview.delete);
};
