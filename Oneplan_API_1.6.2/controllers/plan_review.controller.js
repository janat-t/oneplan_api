const Plan_review = require("../models/plan_review.model.js");
const Plan_tag = require("../models/plan_tag.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const plan_review = new Plan_review({
    plan_id: req.body.plan_id,
	rating: req.body.rating,
    review: req.body.review
  });

  Plan_review.create(plan_review, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plan_review."
      });
    else res.send(data);
  });
};

exports.findId = (req, res) => {
  Plan_review.findById(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_review with review_id ${req.params.reviewId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_review with review_id " + req.params.reviewId
        });
      }
    } else res.send(data);
  });
};

exports.findPlanId = (req, res) => {
  Plan_review.findByPlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_review with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_review with plan_id " + req.params.planId
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Plan_review.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plan_review."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  Plan_review.updateById(
    req.params.reviewId,
    new Plan_review(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Plan_review with id ${req.params.reviewId}.`
          });
        } else {
          res.status(500).send({
            message:
              "Error updating plan_review with review_id " + req.params.reviewId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Plan_review.remove(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_review with review_id ${req.params.reviewId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete plan_review with review_id " + req.params.reviewId
        });
      }
    } else
      res.send({
        message: `Plan_review with review_id ${req.params.reviewId} was deleted successfully!`
      });
  });
};

exports.sum = (req, res) => {
  Plan_review.getSum((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plan_review."
      });
    else res.send(data);
  });
};
