const Plan_season = require("../models/plan_season.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const plan_season = new Plan_season({
    plan_id: req.body.plan_id,
    season_id: req.body.season_id
  });

  Plan_season.create(plan_season, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the plan_season."
      });
    else res.send(data);
  });
};

exports.duplicate = (req, res) => {
  Plan_season.findByPlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_season with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plan_season with plan_id " + req.params.planId
        });
      }
    } else {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        const plan_season = new Plan_season({
          plan_id: req.params.newPlanId,
          season_id: data[i].season_id
        });
        Plan_season.create(plan_season, (err, data2) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while duplicating plan_season with plan_id." +
                  req.params.planId
            });
          else array.concat(data2);
        });
      }
      res.send(array);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }

  Plan_season.updateById(
    req.params.planId,
    new Plan_season(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Plan_season with id ${req.params.planId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating plan_season with plan_id " + req.params.planId,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deletePlanId = (req, res) => {
  Plan_season.removePlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_season with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete plan_season with plan_id " + req.params.planId
        });
      }
    } else
      res.send({
        message: `Plan_season with plan_id ${req.params.planId} was deleted successfully!`
      });
  });
};

exports.deleteSeasonId = (req, res) => {
  Plan_season.removeSeasonId(req.params.seasonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_season with season_id ${req.params.seasonId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete plan_season with season_id " + req.params.seasonId
        });
      }
    } else
      res.send({
        message: `Plan_season with season_id ${req.params.seasonId} was deleted successfully!`
      });
  });
};
