const Attraction_recommended = require("../models/attraction_recommended.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const attraction_recommended = new Attraction_recommended({
    google_place_id: req.body.google_place_id,
    city_id: req.body.city_id
  });

  Attraction_recommended.create(attraction_recommended, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the attraction_recommended."
      });
    else res.send(data);
  });
};

exports.findCityId = (req, res) => {
  Attraction_recommended.findByCityId(req.query.cityId, async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        googleapi.findId(req, res);
      } else {
        res.status(500).send({
          message: "Error retrieving the attraction_recommended with google_place_id " + req.query.attraction_recommendedId
        });
      }
    } else res.send(data);
  });
};
