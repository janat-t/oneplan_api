const Plan_overview = require("../models/plan_overview.model.js");
const Plan_tag = require("../models/plan_tag.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const plan_overview = new Plan_overview({
    plan_title: req.body.plan_title,
    user_id: req.body.user_id,
    city_id: req.body.city_id,
    duration: req.body.duration,
    plan_description: req.body.plan_description,
    original_id: req.body.original_id,
    available: req.body.available,
    star_rating: req.body.star_rating
  });

  Plan_overview.create(plan_overview, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plan_overview."
      });
    else res.send(data);
  });
};

exports.findId = (req, res) => {
  Plan_overview.findById(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_overview with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_overview with plan_id " + req.params.planId
        });
      }
    } else res.send(data);
  });
};

exports.findUser = (req, res) => {
  Plan_overview.findByUser(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_overview of user with user_id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_overview of user with user_id " +
            req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.findCriteria = (req, res) => {
  Plan_overview.findByCriteriaTag(
    req.params.cityId,
    req.params.start,
    req.params.stop,
    ('"' + req.params.style.replace(",", '","') + '"').split(","),
    async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found plan_overview in city with the current criteria.`
          });
        } else {
          res.status(500).send({
            message:
              "Error retrieving plan_overview in city with the current criteria"
          });
        }
      } else res.send(data);
    }
  );
};

exports.findAll = (req, res) => {
  Plan_overview.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plan_overview."
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

  Plan_overview.updateById(
    req.params.planId,
    new Plan_overview(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Plan_overview with id ${req.params.planId}.`
          });
        } else {
          res.status(500).send({
            message:
              "Error updating plan_overview with plan_id " + req.params.planId
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Plan_overview.remove(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_overview with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete plan_overview with plan_id " + req.params.planId
        });
      }
    } else
      res.send({
        message: `Plan_overview with plan_id ${req.params.planId} was deleted successfully!`
      });
  });
};

exports.duplicate = (req, res) => {
  Plan_overview.findById(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_overview with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_overview with plan_id " + req.params.planId
        });
      }
    } else {
      const plan_overview = new Plan_overview({
        plan_title: data[0].plan_title,
        user_id: req.params.userId,
        city_id: data[0].city_id,
        duration: data[0].duration,
        plan_description: data[0].plan_description,
        original_id: req.params.planId,
        available: data[0].available,
        star_rating: data[0].star_rating
      });
      Plan_overview.create(plan_overview, (err, data2) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while duplicating the plan_overview with plan_id " +
                req.params.planId
          });
        else res.send(data2);
      });
    }
  });
};
