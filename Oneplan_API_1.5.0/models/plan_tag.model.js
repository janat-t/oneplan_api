const sql = require("./db.js");

const Plan_tag = function(plan_tag) {
  this.plan_id = plan_tag.plan_id;
  this.plan_style = plan_tag.plan_style;
};

Plan_tag.create = (newPlan, result) => {
  sql.query("INSERT INTO plan_tag SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_tag: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Plan_tag.findByPlanId = (id, result) => {
  sql.query(`SELECT * FROM plan_tag WHERE plan_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_tag: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plan_tag.findByStyle = (style, result) => {
  sql.query(`SELECT * FROM plan_tag WHERE plan_style = "${style}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_tag: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plan_tag.removePlanId = (id, result) => {
  sql.query("DELETE FROM plan_tag WHERE plan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_tag with plan_id: ", id);
    result(null, res);
  });
};

Plan_tag.removeStyle = (style, result) => {
  sql.query('DELETE FROM plan_tag WHERE plan_style = "${style}"', style, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_tag with style: ", style);
    result(null, res);
  });
};

module.exports = Plan_tag;
