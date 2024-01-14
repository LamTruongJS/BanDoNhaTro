var Rent = require("../models/rent.model");

exports.listByID = function (req, res) {
  const data = req.params;
  Rent.listByID(data, function (response) {
    res.send({ result: response });
  });
};

exports.listByRoomID = function (req, res) {
  const data = req.params;
  Rent.listByRoomID(data, function (response) {
    res.send({ result: response });
  });
};
exports.listAll = function (req, res) {
  Rent.listAll(function (response) {
    res.send({ result: response });
  });
};
exports.deleteRent = function (req, res) {
  const data = req.body;
  Rent.deleteRent(data, function (response) {
    if (data.user_id === undefined || data.room_id === undefined) {
      res.status(403).send({ result: "Invalid params" });
    }
    res.send({ result: response });
  });
};
exports.addRent = function (req, res) {
  const data = req.body;
  Rent.addRent(data, function (response) {
    res.send({ result: response });
  });
};
