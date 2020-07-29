const sql = require("./db.js");

const Plan_detail = function(plan_detail) {
  this.plan_id = plan_detail.plan_id;
  this.day = plan_detail.day;
  this.attraction_order = plan_detail.attraction_order;
  this.start_time = plan_detail.start_time;
  this.end_time = plan_detail.end_time;
  this.time_spend = plan_detail.time_spend;
  this.attraction_id = plan_detail.attraction_id;
  this.google_place_id = plan_detail.google_place_id;
  this.description = plan_detail.description;
};

Plan_detail.create = (newPlan, result) => {
  sql.query("INSERT INTO plan_detail SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_detail: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Plan_detail.removePlanIdAll = (id, result) => {
  sql.query("DELETE FROM plan_detail WHERE plan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("deleted plan_detail with id: ", id);
    result(null, res);
  });
};

Plan_detail.removePlanIdOne = (id, order, result) => {
  sql.query(
    "DELETE FROM plan_detail WHERE plan_id = ? AND attraction_order = ?",
    [id, order],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted plan_detail with id: ", id);
      result(null, res);
    }
  );
};

Plan_detail.updateByIdOne = (id, order, plan_detail, result) => {
  sql.query(
    "UPDATE plan_detail SET plan_id = ?, day = ?, attraction_order = ?, start_time = ?, end_time = ?, time_spend = ?, attraction_id = ?, google_place_id = ?, description = ? WHERE plan_id = ? AND attraction_order = ?",
    [
      plan_detail.plan_id,
      plan_detail.day,
      plan_detail.attraction_order,
      plan_detail.start_time,
      plan_detail.end_time,
      plan_detail.time_spend,
      plan_detail.attraction_id,
      plan_detail.google_place_id,
      plan_detail.description,
      id,
      order
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated plan_detail: ", { id: id, ...plan_detail });
      result(null, { id: id, ...plan_detail });
    }
  );
};

module.exports = Plan_detail;
