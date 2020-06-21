const sql = require("./db.js");

const Attraction_tag = function(attraction_tag) {
  this.attraction_id = attraction_tag.attraction_id;
  this.attraction_style = attraction_tag.attraction_style;
};

Attraction_tag.create = (newPlan, result) => {
  sql.query("INSERT INTO attraction_tag SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created attraction_tag: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Attraction_tag.findByAttractionId = (id, result) => {
  sql.query(`SELECT * FROM attraction_tag WHERE attraction_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found attraction_tag: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Attraction_tag.findByStyle = (style, result) => {
  sql.query(`SELECT * FROM attraction_tag WHERE attraction_type = "${style}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found attraction_tag: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Attraction_tag.removeAttractionId = (id, result) => {
  sql.query("DELETE FROM attraction_tag WHERE attraction_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted attraction_tag with attraction_id: ", id);
    result(null, res);
  });
};

Attraction_tag.removeStyle = (style, result) => {
  sql.query('DELETE FROM attraction_tag WHERE attraction_type = "${style}"', style, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted attraction_tag with style: ", style);
    result(null, res);
  });
};

module.exports = Attraction_tag;
