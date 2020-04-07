const sql = require("./db.js");

const Ward = function(ward) {
  this.ward_id = ward.ward_id;
  this.ward = ward.ward;
  this.city_id = ward.city_id;
};

Ward.create = (newWard, result) => {
  sql.query("INSERT INTO ward SET ?", newWard, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ward: ", { id: res.insertId, ...newWard });
    result(null, { id: res.insertId, ...newWard });
  });
};

Ward.getAll = result => {
  sql.query("SELECT * FROM ward", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("wards: ", res);
    result(null, res);
  });
};

Ward.findById = (id, result) => {
  sql.query(`SELECT * FROM ward WHERE ward_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ward: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Ward.remove = (id, result) => {
  sql.query("DELETE FROM ward WHERE ward_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ward with id: ", id);
    result(null, res);
  });
};

module.exports = Ward;