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

module.exports = Load_plan;
