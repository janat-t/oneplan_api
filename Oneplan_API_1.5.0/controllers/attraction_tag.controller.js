const Attraction_tag = require("../models/attraction_tag.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const attraction_tag = new Attraction_tag({
    attraction_id: req.body.attraction_id,
    style: req.body.style
  });

  Attraction_tag.create(attraction_tag, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the attraction_tag."
      });
    else res.send(data);
  });
};

exports.findAttractionId = (req, res) => {
  Attraction_tag.findByAttractionId(req.params.attractionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found attraction_tag with attraction_id ${req.params.attractionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving attraction_tag with attraction_id " + req.params.attractionId
        });
      }
    } else res.send(data);
  });
};

exports.findStyle = (req, res) => {
  Attraction_tag.findByStyle(req.params.style, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found attraction_tag with style ${req.params.style}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving attraction_tag with style " + req.params.style
        });
      }
    } else res.send(data);
  });
};

exports.deleteAttractionId = (req, res) => {
  Attraction_tag.removeAttractionId(req.params.attractionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found attraction_tag with attraction_id ${req.params.attractionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete attraction_tag with attraction_id " + req.params.attractionId
        });
      }
    } else
      res.send({
        message: `Attraction_tag with attraction_id ${req.params.attractionId} was deleted successfully!`
      });
  });
};

exports.deleteStyle = (req, res) => {
  Attraction_tag.removeStyle(req.params.style, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found attraction_tag with style ${req.params.style}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete attraction_tag with style " + req.params.style
        });
      }
    } else
      res.send({
        message: `Attraction_tag with style ${req.params.style} was deleted successfully!`
      });
  });
};
