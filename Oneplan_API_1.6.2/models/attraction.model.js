const sql = require("./db.js");

const Attraction = function(attraction) {
  this.google_place_id = attraction.google_place_id;
  this.attraction_link = attraction.attraction_link;
};

Attraction.create = (newAttraction, result) => {
  sql.query("INSERT INTO attraction SET ?", newAttraction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created attraction: ", { id: res.insertId, ...newAttraction });
    result(null, { id: res.insertId, ...newAttraction });
  });
};

Attraction.findByGoogleId = (id, result) => {
  sql.query(`SELECT * FROM attraction WHERE google_place_id = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found attraction: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Attraction.getAll = result => {
  sql.query("SELECT * FROM attraction", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("attraction: ", res);
    result(null, res);
  });
};

Attraction.updateById = (id, attraction, result) => {
  sql.query(
    "UPDATE attraction SET google_place_id = ?, attraction_link = ? WHERE google_place_id = ?",
    [
      attraction.google_place_id,
      attraction.attraction_link,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found attraction with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated attraction: ", { id: id, ...attraction });
      result(null, { id: id, ...attraction });
    }
  );
};

Attraction.remove = (id, result) => {
  sql.query("DELETE FROM attraction WHERE google_place_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted attraction with id: ", id);
    result(null, res);
  });
};

module.exports = Attraction;
