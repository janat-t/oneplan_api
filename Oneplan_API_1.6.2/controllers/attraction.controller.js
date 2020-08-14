const Attraction = require("../models/attraction.model.js");
const axios = require("axios");
const { API_key } = require("../config/googleapi.config.js");
const googleapi = require("./googleapi.controller.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const attraction = new Attraction({
    google_place_id: req.body.google_place_id,
    attraction_link: req.body.attraction_link
  });

  Attraction.create(attraction, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the attraction."
      });
    else res.send(data);
  });
};

exports.findGoogleId = (req, res) => {
  Attraction.findByGoogleId(req.params.placeId, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        googleapi.findId(req, res);
      } else {
        res.status(500).send({
          message: "Error retrieving the attraction with google_place_id " + req.params.attractionId
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Attraction.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving attraction."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  Attraction.updateById(req.params.attractionId, new Attraction(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the attraction with attraction_id ${req.params.attractionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating the attraction with attraction_id " + req.params.attractionId
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Attraction.remove(req.params.attractionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the attraction with attraction_id ${req.params.attractionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete the attraction with attraction_id " + req.params.attractionId
        });
      }
    } else
      res.send({
        message: `The attraction with attraction_id ${req.params.attractionId} was deleted successfully!`
      });
  });
};
