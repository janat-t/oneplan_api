const Load_plan = require("../models/load_plan.model.js");

exports.searchPlanCriteria = (req, res) => {
  var tags = ('"' + req.query.tags.replace(/,/g, '","') + '"').split(",");
  var order =
    "SELECT * FROM plan_overview " +
    " INNER JOIN plan_tag ON plan_overview.plan_id = plan_tag.plan_id " +
    " INNER JOIN plan_tag_name ON plan_tag.tag_id = plan_tag_name.tag_id " +
    " INNER JOIN plan_location ON plan_overview.plan_id = plan_location.plan_id WHERE";
  if (req.query.planId) {
    order += " plan_overview.plan_id = " + req.query.planId + " AND";
  }
  if (req.query.userId) {
    order += " user_id = " + req.query.userId + " AND";
  }
  if (req.query.budget) {
    order += " budget = " + req.query.budget + " AND";
  }
  if (req.query.cityId && req.query.cityId != "0") {
    order += " plan_location.city_id = " + req.query.cityId + " AND";
  }
  if (req.query.start) {
    order += " duration >= " + req.query.start + " AND";
  }
  if (req.query.stop) {
    order += " duration <= " + req.query.stop + " AND";
  }
  order +=
    " plan_tag_name.tag_name IN (" +
    tags +
    ") GROUP BY plan_overview.plan_id ORDER BY count(plan_overview.plan_id) DESC, plan_overview.star_rating DESC";

  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_overview in city with the current criteria.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_overview in city with the current criteria",
        });
      }
    } else res.send(data);
  });
};

exports.loadSimpleId = (req, res) => {
  var order =
    "SELECT * FROM plan_overview " +
    " INNER JOIN user ON plan_overview.user_id = user.user_id " +
    " INNER JOIN city ON plan_overview.city_id = city.city_id " +
    " INNER JOIN country ON city.country_id = country.country_id ";
  console.log(req.query.planId);
  if (req.query.planId != "all") {
    order += " WHERE plan_overview.plan_id IN ( " + req.query.planId + ") ";
  }
  order = order.replace(/"/g, "");
  console.log(order);
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};

exports.loadFullId = (req, res) => {
  var order1 =
    "SELECT * FROM plan_overview WHERE plan_overview.plan_id = " +
    req.query.planId;

  var order2 =
    "SELECT * FROM plan_location " +
    "INNER JOIN city ON plan_location.city_id = city.city_id " +
    "INNER JOIN country ON city.country_id = country.country_id " +
    "WHERE plan_location.plan_id = " +
    req.query.planId;

  var order3 = "SELECT * FROM plan_tag WHERE plan_id = " + req.query.planId;

  var order4 =
    "SELECT * FROM plan_startday WHERE plan_id = " +
    req.query.planId +
    " ORDER BY day";

  var order5 =
    "SELECT * FROM attraction " +
    "INNER JOIN plan_detail ON plan_detail.attraction_id = attraction.attraction_id " +
    "WHERE plan_detail.plan_id = " +
    req.query.planId +
    " ORDER BY attraction_order";

  var order6 =
    "SELECT * FROM plan_location WHERE plan_id = " + req.query.planId;

  var order7 = "SELECT * FROM plan_review WHERE plan_id = " + req.query.planId;

  Load_plan.execute(order1, (err, data1) => {
    if (err) {
      res.status(500).send({
        message:
          "Error retrieving plan_overview with plan_id " + req.query.planId,
      });
      return;
    }
    Load_plan.execute(order2, (err, data2) => {
      if (err) {
        if (err.kind === "not_found") {
          data2 = [];
        } else {
          res.status(500).send({
            message:
              "Error retrieving plan_city of plan with plan_id " +
              req.query.planId,
          });
          return;
        }
      }
      Load_plan.execute(order3, (err, data3) => {
        if (err) {
          if (err.kind === "not_found") {
            data3 = [];
          } else {
            res.status(500).send({
              message:
                "Error retrieving plan_tag of plan with plan_id " +
                req.query.planI,
            });
            return;
          }
        }
        Load_plan.execute(order4, (err, data4) => {
          if (err) {
            if (err.kind === "not_found") {
              data4 = [];
            } else {
              res.status(500).send({
                message:
                  "Error retrieving plan_startday of plan with plan_id " +
                  req.query.planId,
              });
              return;
            }
          }
          Load_plan.execute(order5, (err, data5) => {
            if (err) {
              if (err.kind === "not_found") {
                data5 = [];
              } else {
                res.status(500).send({
                  message:
                    "Error retrieving plan_details of plan with plan_id " +
                    req.query.planId,
                });
                return;
              }
            }
            Load_plan.execute(order6, (err, data6) => {
              if (err) {
                if (err.kind === "not_found") {
                  data6 = null;
                } else {
                  res.status(500).send({
                    message:
                      "Error retrieving plan_location of plan with plan_id " +
                      req.query.planId,
                  });
                  return;
                }
              }
              Load_plan.execute(order7, (err, data7) => {
                if (err) {
                  if (err.kind === "not_found") {
                    data7 = [];
                  } else {
                    res.status(500).send({
                      message:
                        "Error retrieving plan_review of plan with plan_id " +
                        req.query.planId,
                    });
                    return;
                  }
                }
                res.send({
                  plan_overview: data1[0],
                  plan_city: data2,
                  plan_tag: data3,
                  plan_startday: data4,
                  plan_detail: data5,
                  plan_location: data6,
                  plan_review: data7,
                });
              });
            });
          });
        });
      });
    });
  });
};
