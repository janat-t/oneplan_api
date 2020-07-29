const Plan_tag = require("../models/plan_tag.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }

  const plan_tag = new Plan_tag({
    plan_id: req.body.plan_id,
    tag_id: req.body.tag_id,
  });

  Plan_tag.create(plan_tag, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plan_tag.",
      });
    else res.send(data);
  });
};

exports.deletePlanId = (req, res) => {
  Plan_tag.removePlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_tag with plan_id ${req.params.planId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete plan_tag with plan_id " + req.params.planId,
        });
      }
    } else
      res.send({
        message: `Plan_tag with plan_id ${req.params.planId} was deleted successfully!`,
      });
  });
};

exports.deleteStyle = (req, res) => {
  Plan_tag.removeStyle(req.params.style, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_tag with style ${req.params.style}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete plan_tag with style " + req.params.style,
        });
      }
    } else
      res.send({
        message: `Plan_tag with style ${req.params.style} was deleted successfully!`,
      });
  });
};
