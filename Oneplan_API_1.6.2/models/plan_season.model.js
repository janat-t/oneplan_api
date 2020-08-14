const sql = require("./db.js");

const Plan_season = function(plan_season) {
  this.plan_id = plan_season.plan_id;
  this.season_id = plan_season.season_id;
};

Plan_season.create = (newPlan, result) => {
  sql.query("INSERT INTO plan_season SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_season: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Plan_season.findByPlanId = (id, result) => {
  sql.query(`SELECT * FROM plan_season WHERE plan_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_season: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plan_season.removePlanId = (id, result) => {
  sql.query("DELETE FROM plan_season WHERE plan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_season with plan_id: ", id);
    result(null, res);
  });
};

Plan_season.removeSeasonId = (id, result) => {
  sql.query("DELETE FROM plan_season WHERE season_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_season with season_id: ", id);
    result(null, res);
  });
};

Plan_season.updateById = (id, plan_season, result) => {
  sql.query(
    "UPDATE plan_season SET plan_id = ?, season_id = ? WHERE plan_id = ?",
    [
      plan_season.plan_id,
      plan_season.season_id,
      id,
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

      console.log("updated plan_season: ", { id: id, ...plan_season });
      result(null, { id: id, ...plan_season });
    }
  );
};

module.exports = Plan_season;
