module.exports = app => {
  const plan_review = require("../controllers/plan_review.controller.js");
  app.post("/api/plan_review", plan_review.create);
  app.put("/api/plan_review/:reviewId", plan_review.update);
  app.delete("/api/plan_review/:reviewId", plan_review.delete);
  app.get("/api/plan_review/sum/:planId", plan_review.sum);
};
