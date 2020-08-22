const plan_cover = require("../models/plan_cover.model.js");
const aws_config = require("../config/aws.config.js");
const axios = require("axios");
var aws = require("aws-sdk");

aws.config.update({
  accessKeyId: aws_config.accessKeyId,
  secretAccessKey: aws_config.secretAccessKey,
  Bucket: aws_config.Bucket,
  region: aws_config.region
});

exports.uploadCover = (req, res) => {
  console.log(req.body);
  var S3 = new aws.S3();

  var params = {
    Bucket: aws_config.Bucket,
    Key: "" + req.body.plan_id,
    Expires: 120,
    ContentType: req.body.type
  };
  S3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const planId = req.params.planId;
  const image = req.body.image;

  plan_cover.create(plan_coverx, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plan_cover."
      });
    else res.send(data);
  });
};

exports.findplan_coverId = (req, res) => {
  plan_cover.findByplan_coverId(req.params.plan_coverId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not found plan_cover with plan_cover_id " + req.params.plan_coverId
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_cover with plan_cover_id " +
            req.params.plan_coverId
        });
      }
    } else res.send(data);
  });
};

exports.findAttractionId = (req, res) => {
  plan_cover.findByAttractionId(req.params.attractionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not found plan_cover with attraction_id " + req.params.attractionId
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving plan_cover with attraction_id " +
            req.params.attractionId
        });
      }
    } else res.send(data);
  });
};

exports.deleteplan_coverId = (req, res) => {
  plan_cover.removeplan_coverId(req.params.plan_coverId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not found plan_cover with plan_cover_id " + req.params.plan_coverId
        });
      } else {
        res.status(500).send({
          message:
            "Not found plan_cover with plan_cover_id " + req.params.plan_coverId
        });
      }
    } else
      res.send({
        message:
          "plan_cover with plan_cover_id " +
          req.params.plan_coverId +
          " was deleted successfully!"
      });
  });
};

exports.deleteAttractionId = (req, res) => {
  plan_cover.removeAttractionId(req.params.attractionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not found plan_cover with attraction_id " + req.params.attractionId
        });
      } else {
        res.status(500).send({
          message:
            "Not found plan_cover with attraction_id " + req.params.attractionId
        });
      }
    } else
      res.send({
        message:
          "plan_cover with attraction_id " +
          req.params.attractionId +
          " was deleted successfully!"
      });
  });
};

exports.updateId = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  plan_cover.updateById(
    req.params.plan_coverId,
    new plan_cover(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message:
              "Not found plan_cover with plan_cover_id " +
              req.params.plan_coverId
          });
        } else {
          res.status(500).send({
            message:
              "Error updating plan_cover with plan_cover_id  " +
              req.params.plan_coverId
          });
        }
      } else res.send(data);
    }
  );
};
