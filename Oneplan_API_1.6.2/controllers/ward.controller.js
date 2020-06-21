const Ward = require("../models/ward.model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty."
    });
  }

  const ward = new Ward({
    ward_id: req.body.ward_id,
    ward: req.body.ward,
    city_id: req.body.city_id
  });

  Ward.create(ward, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ward."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Ward.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cities."
      });
    else res.send(data);
  });
};

exports.findId = (req, res) => {
  Ward.findById(req.params.wardId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the ward with ward_id ${req.params.wardId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving the ward with ward_id " + req.params.wardId
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Ward.remove(req.params.wardId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the ward with ward_id ${req.params.wardId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete the ward with ward_id " + req.params.wardId
        });
      }
    } else
      res.send({ message: `The ward with ward_id ${req.params.wardId} was deleted successfully!` });
  });
};
