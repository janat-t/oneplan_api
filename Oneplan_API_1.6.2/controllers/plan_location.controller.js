const Plan_location = require("../models/plan_location.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const plan_location = new Plan_location({
    plan_id: req.body.plan_id,
    city_id: req.body.city_id
  });

  Plan_location.create(plan_location, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the plan_location."
      });
    else res.send(data);
  });
};

exports.findPlanId = (req, res) => {
  Plan_location.findByPlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_location with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plan_location with plan_id " + req.params.planId
        });
      }
    } else res.send(data);
  });
};

exports.findCityId = (req, res) => {
  Plan_location.findByCityId(req.params.cityId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_location with city_id ${req.params.cityId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plan_location with city_id " + req.params.cityId
        });
      }
    } else res.send(data);
  });
};

exports.duplicate = (req, res) => {
  Plan_location.findByPlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_location with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plan_location with plan_id " + req.params.planId
        });
      }
    } else {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        const plan_location = new Plan_location({
          plan_id: req.params.newPlanId,
          city_id: data[i].city_id
        });
        Plan_location.create(plan_location, (err, data2) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while duplicating plan_location with plan_id." +
                  req.params.planId
            });
          else array.concat(data2);
        });
      }
      res.send(array);
    }
  });
};

exports.deletePlanId = (req, res) => {
  Plan_location.removePlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_location with plan_id ${req.params.planId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete plan_location with plan_id " + req.params.planId
        });
      }
    } else
      res.send({
        message: `Plan_location with plan_id ${req.params.planId} was deleted successfully!`
      });
  });
};

exports.deleteCityId = (req, res) => {
  Plan_location.removeCityId(req.params.cityId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_location with city_id ${req.params.cityId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete plan_location with city_id " + req.params.cityId
        });
      }
    } else
      res.send({
        message: `Plan_location with city_id ${req.params.cityId} was deleted successfully!`
      });
  });
};
