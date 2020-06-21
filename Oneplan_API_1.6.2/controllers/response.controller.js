const Response = require("../models/response.model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const response = new Response({
    response_id: req.body.response_id,
    web_rating: req.body.web_rating,
    web_use: req.body.web_use,
	web_comment: req.body.web_comment
  });

  Response.create(response, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the response."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Response.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities."
      });
    else res.send(data);
  });
};

exports.findId = (req, res) => {
  Response.findById(req.params.responseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the response with response_id ${req.params.responseId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving the response with response_id " + req.params.responseId
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Response.remove(req.params.responseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the response with response_id ${req.params.responseId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete the response with response_id " + req.params.responseId
        });
      }
    } else
      res.send({ message: `The response with response_id ${req.params.responseId} was deleted successfully!` });
  });
};
