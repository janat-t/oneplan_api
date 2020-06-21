const sql = require("./db.js");

const Response = function(response) {
  this.response_id = response.response_id;
  this.web_rating = response.web_rating;
  this.web_use = response.web_use;
  this.web_comment = response.web_comment;
};

Response.create = (newResponse, result) => {
  sql.query("INSERT INTO response SET ?", newResponse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created response: ", { id: res.insertId, ...newResponse });
    result(null, { id: res.insertId, ...newResponse });
  });
};

Response.getAll = result => {
  sql.query("SELECT * FROM response", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("responses: ", res);
    result(null, res);
  });
};

Response.findById = (id, result) => {
  sql.query(`SELECT * FROM response WHERE response_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found response: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Response.remove = (id, result) => {
  sql.query("DELETE FROM response WHERE response_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted response with id: ", id);
    result(null, res);
  });
};

module.exports = Response;
