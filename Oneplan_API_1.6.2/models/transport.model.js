const sql = require("./db.js");

const Transport = function(transport) {
  this.source_id = transport.source_id;
  this.destination_id = transport.destination_id;
  this.plan_id = transport.plan_id;
  this.day = transport.day;
  this.trans_order = transport.trans_order;
  this.distance = transport.distance;
  this.mode = transport.mode;
  this.text = transport.text;
};

Transport.create = (newTransport, result) => {
  sql.query("INSERT INTO transport SET ?", newTransport, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transport: ", { ...newTransport });
    result(null, { ...newTransport });
  });
};

Transport.findByPlanId = (id, result) => {
  sql.query(`SELECT * FROM transport WHERE plan_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transport: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Transport.findAllFromOne = (source_id, result) => {
  sql.query(
    `SELECT * FROM transport WHERE source_id = ${source_id} ORDER BY destination_id`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found transport: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Transport.findAllToOne = (destination_id, result) => {
  sql.query(
    `SELECT * FROM transport WHERE destination_id = ${destination_id} ORDER BY source_id`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found transport: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Transport.findByPair = (source, sink, result) => {
  sql.query(
    `SELECT * FROM transport WHERE source_id = ${source} AND destination_id = ${sink}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found transport: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Transport.removePlanIdAll = (id, result) => {
  sql.query("DELETE FROM transport WHERE plan_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("deleted transport with id: ", id);
    result(null, res);
  });
};

Transport.removePlanIdOne = (id, day, order, result) => {
  sql.query(
    "DELETE FROM transport WHERE plan_id = ? AND day = ? AND trans_order = ?",
    [id, day, order],
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

      console.log("deleted transport with id: ", id);
      result(null, res);
    }
  );
};

Transport.updateByIdOne = (id, day, order, transport, result) => {
  sql.query(
    "UPDATE transport SET source_id = ?, destination_id = ?, plan_id = ?, day = ?, trans_order = ?, distance = ?, mode = ?, text = ? WHERE plan_id = ? AND day = ? AND trans_order = ?",
    [
      transport.source_id,
      transport.destination_id,
      transport.plan_id,
      transport.day,
      transport.trans_order,
      transport.distance,
      transport.mode,
      transport.text,
      id,
      day,
      order,
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

      console.log("updated transport: ", { ...transport });
      result(null, { ...transport });
    }
  );
};

Transport.removeFromOne = (source_id, result) => {
  sql.query("DELETE FROM transport WHERE source_id = ?", source_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted transport with source_id: ", source_id);
    result(null, res);
  });
};

Transport.removeToOne = (destination_id, result) => {
  sql.query("DELETE FROM transport WHERE destination_id = ?", destination_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted transport with destination_id: ", destination_id);
    result(null, res);
  });
};

Transport.removePair = (source, sink, result) => {
  sql.query(
    "DELETE FROM transport WHERE source_id = ? AND destination_id = ?",
    [source, sink],
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

      console.log("deleted transport with source_id: ", source);
      result(null, res);
    }
  );
};

Transport.updateByPair = (source, sink, transport, result) => {
  sql.query(
    "UPDATE transport SET source_id = ?, destination_id = ?, walk = ?, bicycle = ?, train = ?, car = ? WHERE source_id = ? AND destination_id = ?",
    [
      transport.source_id,
      transport.destination_id,
      transport.walk,
      transport.bicycle,
      transport.train,
      transport.car,
      source,
      sink
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

      console.log("updated transport: ", { ...transport });
      result(null, { ...transport });
    }
  );
};

module.exports = Transport;
