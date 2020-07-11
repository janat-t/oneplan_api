module.exports = app => {
  const plan_cover = require("../controllers/plan_cover.controller.js");
  app.post("/api/plan_cover", plan_cover.uploadCover);
  app.put("/api/plan_cover", plan_cover.uploadCoverImage);
  // app.post("/api/plan_cover/:planId/:newPlanId", plan_cover.duplicate);
  // app.get("/api/plan_cover/:planId", plan_cover.findId);
  // app.delete("/api/plan_cover/:planId", plan_cover.deleteId);
};
