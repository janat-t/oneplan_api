const sql = require("./db.js");

const Load_plan = function(plan_overview) {
};

Load_plan.execute = (order, result) => {
  sql.query(order,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found plan: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Load_plan.loadFullOverview = (id, result) => {
  var order = "SELECT * FROM plan_overview WHERE plan_overview.plan_id = " + id;
  sql.query(order,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found plan: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Load_plan.loadFullStartday = (id, result) => {
  var order = "SELECT * FROM plan_startday WHERE plan_id = " +
    id +
    " ORDER BY day";
  sql.query(order,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found plan: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Load_plan.loadFullTransport = (id, result) => {
  var order = "SELECT * FROM transport WHERE plan_id = " + id  +
  " ORDER BY day, trans_order";
  sql.query(order,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found plan: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Load_plan;
