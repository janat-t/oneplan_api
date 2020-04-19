const sql = require("./db.js");

const Attraction = function(attraction) {
  this.attraction_name = attraction.attraction_name;
  this.google_place_id = attraction.google_place_id;
  this.attraction_name_thai = attraction.attraction_name_thai;
  this.attraction_type = attraction.attraction_type;
  this.open_time = attraction.open_time;
  this.close_time = attraction.close_time;
  this.attraction_description = attraction.attraction_description;
  this.ward_id = attraction.ward_id;
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

Attraction.findById = (id, result) => {
  sql.query(`SELECT * FROM attraction WHERE attraction_id = ${id}`, (err, res) => {
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

Attraction.findByGoogleId = (id, result) => {
  sql.query(`SELECT * FROM attraction WHERE google_place_id = ${id}`, (err, res) => {
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

Attraction.findByStyle = (style, result) => {
  sql.query(`SELECT * FROM attraction WHERE attraction_type = "${style}"`, (err, res) => {
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

Attraction.findByWard = (id, result) => {
  sql.query(`SELECT * FROM attraction WHERE ward_id = ${id}`, (err, res) => {
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

Attraction.findByCity = (id, result) => {
  sql.query(
    `SELECT * FROM attraction 
  INNER JOIN ward ON attraction.ward_id = ward.ward_id 
  INNER JOIN city ON ward.city_id = city.city_id 
  WHERE city.city_id = ${id}`,
    (err, res) => {
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
    }
  );
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
    "UPDATE attraction SET attraction_name = ?, google_place_id = ?, attraction_name_thai = ?, attraction_type = ?, open_time = ?, close_time = ?, attraction_description = ?, ward_id = ? WHERE attraction_id = ?",
    [
      attraction.attraction_name,
      attraction.google_place_id,
      attraction.attraction_name_thai,
      attraction.attraction_type,
      attraction.open_time,
      attraction.close_time,
      attraction.attraction_description,
      attraction.ward_id,
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
  sql.query("DELETE FROM attraction WHERE attraction_id = ?", id, (err, res) => {
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
