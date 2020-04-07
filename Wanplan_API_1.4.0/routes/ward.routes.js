module.exports = app => {
  const ward = require("../controllers/ward.controller.js");
  app.post("/api/ward", ward.create);
  app.get("/api/ward", ward.findAll);
  app.get("/api/ward/:wardId", ward.findId);
  app.delete("/api/ward/:wardId", ward.delete);
};