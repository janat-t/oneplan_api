const Transport = require("../models/transport.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }

  const transport = new Transport({
    source_id: req.body.source_id,
    destination_id: req.body.destination_id,
    plan_id: req.body.plan_id,
    day: req.body.day,
    trans_order: req.body.trans_order,
    distance: req.body.distance,
    mode: req.body.mode,
    text: req.body.text,
  });

  Transport.create(transport, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the transport.",
      });
    else res.send(data);
  });
};

exports.duplicate = (req, res) => {
  Transport.findByPlanId(req.params.planId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // res.status(404).send({
        //   message: `Not found plan_detail with plan_id ${req.params.planId}.`,
        // });
        res.send([]);
      } else {
        res.status(500).send({
          message:
            "Error retrieving transport with plan_id " + req.params.planId,
        });
      }
    } else if (data.length === 0) {
      res.send(data);
    } else {
      let array = [];
      for (let i = 0; i < data.length; i++) {
        const transport = new Transport({
          source_id: data[i].source_id,
          destination_id: data[i].destination_id,
          plan_id: req.params.newPlanId,
          day: data[i].day,
          trans_order: data[i].trans_order,
          distance: data[i].distance,
          mode: data[i].mode,
          text: data[i].text,
        });
        Transport.create(transport, (err, data2) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while duplicating transport with plan_id " +
                  req.params.planId,
            });
          else array.concat(data2);
        });
      }
      res.send(array);
    }
  });
};

exports.findAllFrom = (req, res) => {
  Transport.findAllFromOne(req.params.sourceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found transport with source_id ${req.params.sourceId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving transport with source_id " + req.params.sourceId,
        });
      }
    } else res.send(data);
  });
};

exports.findAllTo = (req, res) => {
  Transport.findAllToOne(req.params.destinationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found transport with destination_id ${req.params.destinationId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving transport with destination_id " +
            req.params.destinationId,
        });
      }
    } else res.send(data);
  });
};

exports.findPair = (req, res) => {
  Transport.findByPair(
    req.params.sourceId,
    req.params.destinationId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found transport with source_id ${req.params.sourceId} destination_id ${req.params.destinationId}.`,
          });
        } else {
          res.status(500).send({
            message: `Error retrieving transport with source_id ${req.params.sourceId} destination_id ${req.params.destinationId}.`,
          });
        }
      } else res.send(data);
    }
  );
};

exports.deletePlanIdAll = (req, res) => {
  Transport.removePlanIdAll(req.params.planId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete transport with plan_id " + req.params.planId,
      });
    } else
      res.send({
        message: `transport with plan_id was deleted successfully!`,
      });
  });
};

exports.deletePlanIdOne = (req, res) => {
  Transport.removePlanIdOne(
    req.params.planId,
    req.params.day,
    req.params.order,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found transport with plan_id ${req.params.planId} day ${req.params.day} trans_order ${req.params.order}..`,
          });
        } else {
          res.status(500).send({
            message: `Not found transport with plan_id ${req.params.planId} day ${req.params.day} trans_order ${req.params.order}.`,
          });
        }
      } else
        res.send({
          message: `Transport with plan_id ${req.params.planId} day ${req.params.day} trans_order ${req.params.order}. was deleted successfully!`,
        });
    }
  );
};

exports.deleteFrom = (req, res) => {
  Transport.removeFromOne(req.params.sourceId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found transport with source_id ${req.params.sourceId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete transport with source_id " + req.params.sourceId,
        });
      }
    } else
      res.send({
        message: `Transport with source_id ${req.params.sourceId} was deleted successfully!`,
      });
  });
};

exports.deleteTo = (req, res) => {
  Transport.removeToOne(req.params.destinationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found transport with destination_id ${req.params.destinationId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete transport with destination_id " +
            req.params.destinationId,
        });
      }
    } else
      res.send({
        message: `Transport with destination_id ${req.params.destinationId} was deleted successfully!`,
      });
  });
};

exports.deletePair = (req, res) => {
  Transport.removePair(
    req.params.sourceId,
    req.params.destinationId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found transport with source_id ${req.params.sourceId} destination_id ${req.params.destinationId}.`,
          });
        } else {
          res.status(500).send({
            message: `Could not delete transport with source_id ${req.params.sourceId} destination_id ${req.params.destinationId}.`,
          });
        }
      } else
        res.send({
          message: `Transport with source_id ${req.params.sourceId} destination_id ${req.params.destinationId} was deleted successfully!`,
        });
    }
  );
};

exports.updateOne = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Transport.updateByIdOne(
    req.params.planId,
    req.params.day,
    req.params.order,
    new Transport(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found transport with plan_id  ${req.params.planId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating transport with plan_id  " + req.params.planId,
          });
        }
      } else res.send(data);
    }
  );
};

// exports.updateOne = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty.",
//     });
//   }

//   Transport.updateByPair(
//     req.params.sourceId,
//     req.params.destinationId,
//     new Transport(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found transport with source_id ${req.params.sourceId}.`,
//           });
//         } else {
//           res.status(500).send({
//             message:
//               "Error updating transport with source_id " + req.params.sourceId,
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };
