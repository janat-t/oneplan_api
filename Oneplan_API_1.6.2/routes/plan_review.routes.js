module.exports = app => {
  const plan_review = require("../controllers/plan_review.controller.js");
  app.post("/api/plan_review", plan_review.create);
  app.get("/api/plan_review", plan_review.findAll);
  app.get("/api/plan_review/:reviewId", plan_review.findId);
  app.get("/api/plan_review/plan_id/:planId", plan_review.findPlanId);
  app.put("/api/plan_review/:reviewId", plan_review.update);
  app.delete("/api/plan_review/:reviewId", plan_review.delete);
  app.get("/api/plan_review", plan_review.sum);
};
