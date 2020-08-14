const sql = require("./db.js");

const Plan_overview = function (plan_overview) {
  this.plan_id = plan_overview.plan_id;
  this.plan_title = plan_overview.plan_title;
  this.user_id = plan_overview.user_id;
  this.contributor = plan_overview.contributor;
  this.duration = plan_overview.duration;
  this.budget = plan_overview.budget;
  this.plan_description = plan_overview.plan_description;
  this.original_id = plan_overview.original_id;
  this.available = plan_overview.available;
  this.star_rating = plan_overview.star_rating;
};

Plan_overview.create = (newPlan, result) => {
  sql.query("INSERT INTO plan_overview SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_overview: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Plan_overview.findById = (id, result) => {
  sql.query(`SELECT * FROM plan_overview WHERE plan_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_overview: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plan_overview.auto_tag_insert = (id, result) => {
  sql.query(
    "INSERT INTO plan_tag (plan_id,tag_id) VALUE (?,?)",
    [id, 0],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { id });
    }
  );
};

Plan_overview.updateById = (id, plan_overview, result) => {
  sql.query(
    "UPDATE plan_overview SET plan_title = ?, user_id = ?, contributor = ?, duration = ?, budget = ?, plan_description = ?, original_id = ?, available = ?, star_rating = ? WHERE plan_id = ?",
    [
      plan_overview.plan_title,
      plan_overview.user_id,
	  plan_overview.contributor,
      plan_overview.duration,
      plan_overview.budget,
      plan_overview.plan_description,
      plan_overview.original_id,
      plan_overview.available,
      plan_overview.star_rating,
      plan_overview.star_rating,
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

      console.log("updated plan_overview: ", { id: id, ...plan_overview });
      result(null, { id: id, ...plan_overview });
    }
  );
};

Plan_overview.remove = (id, result) => {
  sql.query("DELETE FROM plan_overview WHERE plan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_overview with id: ", id);
    result(null, res);
  });
};

module.exports = Plan_overview;
