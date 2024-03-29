const sql = require("./db.js");

const Plan_location = function(plan_location) {
  this.plan_id = plan_location.plan_id;
  this.city_id = plan_location.city_id;
};

Plan_location.create = (newPlan, result) => {
  sql.query("INSERT INTO plan_location SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_location: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Plan_location.findByPlanId = (id, result) => {
  sql.query(`SELECT * FROM plan_location WHERE plan_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_location: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plan_location.findByCityId = (id, result) => {
  sql.query(`SELECT * FROM plan_location WHERE city_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_location: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plan_location.removePlanId = (id, result) => {
  sql.query("DELETE FROM plan_location WHERE plan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_location with plan_id: ", id);
    result(null, res);
  });
};

Plan_location.removeCityId = (id, result) => {
  sql.query("DELETE FROM plan_location WHERE city_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_location with city_id: ", id);
    result(null, res);
  });
};

module.exports = Plan_location;
