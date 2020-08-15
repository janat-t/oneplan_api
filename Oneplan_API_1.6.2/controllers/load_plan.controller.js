const Load_plan = require("../models/load_plan.model.js");

exports.searchPlanCriteria = (req, res) => {
  if (!req.query) {
    res.status(404).send({ message: "Query must be include" });
    return;
  }
  var order =
    "SELECT * FROM plan_overview " +
    " LEFT JOIN plan_tag ON plan_overview.plan_id = plan_tag.plan_id " +
    " LEFT JOIN plan_tag_name ON plan_tag.tag_id = plan_tag_name.tag_id " +
    " LEFT JOIN plan_location ON plan_overview.plan_id = plan_location.plan_id WHERE";
  if (req.query.planId) {
    order += " plan_overview.plan_id = " + req.query.planId + " AND";
  }
  if (req.query.userId) {
    order += ' user_id = "' + req.query.userId + '" AND';
  }
  if (req.query.contributorId) {
    order += ' contributor_id LIKE "%' + req.query.contributorId + '%" AND';
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
  if (req.query.tags) {
    var tags = ('"' + req.query.tags.replace(/,/g, '","') + '"').split(",");
    order += " plan_tag_name.tag_name IN (" + tags + ") AND";
  }
  order = order.slice(0, -4);
  order +=
    " GROUP BY plan_overview.plan_id ORDER BY count(plan_overview.plan_id) DESC, plan_overview.star_rating DESC";
   console.log(order);
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plan_overview in with the current criteria.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_overview in with the current criteria",
        });
      }
    } else{
		for(let i=0;i<data.length;i++){
			if(data[i].contributor) data[i].contributor=data[i].contributor.split(",");
		}
		res.send(data);
	}
  });
};

exports.loadSimpleId = (req, res) => {
  var order =
    "SELECT * FROM plan_overview " +
    " LEFT JOIN user ON plan_overview.user_id = user.user_id " +
    " LEFT JOIN city ON plan_overview.city_id = city.city_id " +
    " LEFT JOIN country ON city.country_id = country.country_id ";
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

exports.loadFullOverview = (req, res) => {
  var order =
    "SELECT * FROM plan_overview WHERE plan_overview.plan_id = " +
    req.query.planId;
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        data=[];
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};

exports.loadFullLocation = (req, res) => {
  var order =
    "SELECT * FROM plan_location " +
    "LEFT JOIN city ON plan_location.city_id = city.city_id " +
    "LEFT JOIN country ON city.country_id = country.country_id " +
    "WHERE plan_location.plan_id = " +
    req.query.planId;
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        data=[];
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};

exports.loadFullTag = (req, res) => {
  var order =
    "SELECT * FROM plan_tag WHERE plan_id = " + req.query.planId;
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        data=[];
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};

exports.loadFullStartday = (req, res) => {
  var order =
    "SELECT * FROM plan_startday WHERE plan_id = " +
    req.query.planId +
    " ORDER BY day";
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        data=[];
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};

exports.loadFullAttraction = (req, res) => {
  var order =
    "SELECT * FROM plan_detail " +
    "LEFT JOIN attraction ON plan_detail.google_place_id = attraction.google_place_id " +
    "WHERE plan_detail.plan_id = " +
    req.query.planId +
    " ORDER BY attraction_order";
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        data=[];
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};

exports.loadFullReview = (req, res) => {
  var order =
    "SELECT * FROM plan_review WHERE plan_id = " + req.query.planId;
  Load_plan.execute(order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        data=[];
      } else {
        res.status(500).send({
          message: "Error retrieving plan.",
        });
      }
    } else res.send(data);
  });
};