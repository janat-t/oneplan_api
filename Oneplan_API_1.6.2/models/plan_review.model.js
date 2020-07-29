const sql = require("./db.js");

const Plan_review = function (plan_review) {
  this.plan_id = plan_review.plan_id;
  this.rating = plan_review.rating;
  this.review = plan_review.review;
};

Plan_review.create = (newPlan, result) => {
  sql.query("INSERT INTO plan_review SET ?", newPlan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plan_review: ", { id: res.insertId, ...newPlan });
    result(null, { id: res.insertId, ...newPlan });
  });
};

Plan_review.updateById = (id, plan_review, result) => {
  sql.query(
    "UPDATE plan_review SET plan_id = ?, rating = ?, review = ? WHERE review_id = ?",
    [
      plan_review.plan_id,
	  plan_review.rating,
      plan_review.review,
      id
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

      console.log("updated plan_review: ", { id: id, ...plan_review });
      result(null, { id: id, ...plan_review });
    }
  );
};

Plan_review.remove = (id, result) => {
  sql.query("DELETE FROM plan_review WHERE review_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plan_review with id: ", id);
    result(null, res);
  });
};

Plan_review.getSum = (id, result) => {
  sql.query("SELECT SUM(rating)/COUNT(rating) FROM plan_review WHERE review_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("plan_review: ", id);
    result(null, res);
  });
};

module.exports = Plan_review;
