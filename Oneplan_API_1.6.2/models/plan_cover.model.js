const sql = require("./db.js");

const plan_cover = function(plan_coverx) {
  this.plan_cover_id = plan_coverx.plan_cover_id;
  this.plan_cover_name = plan_coverx.plan_cover_name;
  this.plan_cover_url = plan_coverx.plan_cover_url;
  this.attraction_id = plan_coverx.attraction_id;
};

plan_cover.create = (newplan_cover, result) => {
  sql.query("INSERT INTO plan_cover SET ?", newplan_cover, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_cover: ", { id: res.insertId, ...newplan_cover });
    result(null, { id: res.insertId, ...newplan_cover });
  });
};

plan_cover.findByplan_coverId = (id, result) => {
  sql.query(`SELECT * FROM plan_cover WHERE plan_cover_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_cover: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

plan_cover.findByAttractionId = (id, result) => {
  sql.query(`SELECT * FROM plan_cover WHERE attraction_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plan_cover: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

plan_cover.removeplan_coverId = (id, result) => {
  sql.query("DELETE FROM plan_cover WHERE plan_cover_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_cover with id: ", id);
    result(null, res);
  });
};

plan_cover.removeAttractionId = (id, result) => {
  sql.query("DELETE FROM plan_cover WHERE attraction_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_cover with attraction_id: ", id);
    result(null, res);
  });
};

plan_cover.updateById = (id, plan_coverx, result) => {
  sql.query(
    "UPDATE plan_cover SET plan_cover_id = ?, plan_cover_name = ?, plan_cover_url = ?, attraction_id = ? WHERE plan_cover_id = ?",
    [plan_coverx.plan_cover_id, plan_coverx.plan_cover_name, plan_coverx.plan_cover_url, plan_coverx.attraction_id, id],
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

      console.log("updated plan_cover: ", { id: id, ...plan_coverx });
      result(null, { id: id, ...plan_coverx });
    }
  );
};

module.exports = plan_cover;
