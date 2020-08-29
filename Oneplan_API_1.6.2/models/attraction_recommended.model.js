const sql = require("./db.js");

const Attraction_recommended = function(attraction_recommended) {
  this.google_place_id = attraction_recommended.google_place_id;
  this.city_id = attraction_recommended.city_id;
};

Attraction_recommended.create = (newAttraction_recommended, result) => {
  sql.query("INSERT INTO attraction_recommended SET ?", newAttraction_recommended, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created attraction_recommended: ", { id: res.insertId, ...newAttraction_recommended });
    result(null, { id: res.insertId, ...newAttraction_recommended });
  });
};

Attraction_recommended.getAll = result => {
  sql.query("SELECT * FROM attraction_recommended ORDER BY city_id ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("found attraction_recommended: ", res);
    result(null, res);
  });
};

Attraction_recommended.findByCityId = (id, result) => {
  sql.query(`SELECT google_place_id FROM attraction_recommended WHERE city_id = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found attraction_recommended: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Attraction_recommended;
