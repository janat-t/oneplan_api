const Plan_detail = require("../models/plan_detail.model.js");
const Attraction = require("../models/attraction.model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Attraction.findByGoogleId(req.body.google_place_id, (err, dummy) => {
    if (err) {
      if (err.kind === "not_found") {
        const attraction = new Attraction({
          google_place_id: req.body.google_place_id,
        });
        Attraction.create(attraction, (err, dummy2) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the attraction.",
            });
          else console.log("updated");
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving the attraction with google_place_id " +
            req.params.attractionId,
        });
      }
    }

    const plan_detail = new Plan_detail({
      plan_id: req.body.plan_id,
      day: req.body.day,
      attraction_order: req.body.attraction_order,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      time_spend: req.body.time_spend,
      google_place_id: req.body.google_place_id,
      description: req.body.description,
    });

    Plan_detail.create(plan_detail, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the plan_detail.",
        });
      else res.send(data);
    });
  });
};

exports.duplicate = (req, res) => {
  Plan_detail.findByPlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // res.status(404).send({
        //   message: `Not found plan_detail with plan_id ${req.params.planId}.`,
        // });
        res.send([])
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_detail with plan_id " + req.params.planId,
        });
      }
    } else if (data.length === 0) {
      res.send(data);
    } else {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        const plan_detail = new Plan_detail({
          plan_id: req.params.newPlanId,
          day: data[i].day,
          attraction_order: data[i].attraction_order,
          start_time: data[i].start_time,
          end_time: data[i].end_time,
          time_spend: data[i].time_spend,
          google_place_id: data[i].google_place_id,
          description: data[i].description,
        });
        Plan_detail.create(plan_detail, (err, data2) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while duplicating plan_detail with plan_id " +
                  req.params.planId,
            });
          else array.concat(data2);
        });
      }
      res.send(array);
    }
  });
};

exports.deletePlanIdAll = (req, res) => {
  Plan_detail.removePlanIdAll(req.params.planId, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          "Could not delete plan_detail with plan_id " + req.params.planId,
      });
    } else
      res.send({
        message: `Plan_detail with plan_id was deleted successfully!`,
      });
  });
};

exports.deletePlanIdOne = (req, res) => {
  Plan_detail.removePlanIdOne(
    req.params.planId,
    req.params.order,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found plan_detail with plan_id ${req.params.planId} attraction_order ${req.params.order}..`,
          });
        } else {
          res.status(500).send({
            message: `Not found plan_detail with plan_id ${req.params.planId} attraction_order ${req.params.order}.`,
          });
        }
      } else
        res.send({
          message: `Plan_detail with plan_id ${req.params.planId} attraction_order ${req.params.order}. was deleted successfully!`,
        });
    }
  );
};

exports.updateOne = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Attraction.findByGoogleId(req.body.google_place_id, (err, dummy) => {
    if (err) {
      if (err.kind === "not_found") {
        const attraction = new Attraction({
          google_place_id: req.body.google_place_id,
        });
        Attraction.create(attraction, (err, dummy2) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the attraction.",
            });
          else console.log("updated");
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving the attraction with google_place_id " +
            req.params.attractionId,
        });
      }
    }
    Plan_detail.updateByIdOne(
      req.params.planId,
      req.params.order,
      new Plan_detail(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found plan_detail with plan_id  ${req.params.planId}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error updating plan_detail with plan_id  " + req.params.planId,
            });
          }
        } else res.send(data);
      }
    );
  });
};
