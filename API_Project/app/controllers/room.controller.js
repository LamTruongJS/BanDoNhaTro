var Room = require("../models/room.model");
exports.list = function (req, res) {
  const params = req.query;
  const motel_id = params.motel_id;
  Room.list(params, function (response) {
    if (motel_id === undefined) {
      res.status(403).send("Invalid params");
    } else {
      res.send({ result: response });
    }
  });
};
exports.detail = function (req, res) {
  const room_id = req.params.room_id;
  Room.detail(room_id, function (response) {
    res.send({ result: response });
  });
};
exports.filter = function (req, res) {
  const params = req.query;
  const motel_id = req.params.motel_id;
  Room.filter({ ...params, motel_id }, function (response) {
    res.send({ result: response });
  });
};
exports.getListTypeRoom = function (req, res) {
  Room.getListTypeRoom(function (response) {
    res.send({ result: response });
  });
};
exports.addRoom = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  Room.addRoom(data, function (response) {
    res.send({ result: response });
  });
};
exports.updateRoom = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  Room.updateRoom(data, function (response) {
    res.send({ result: response });
  });
};
exports.deleteRoom = function (req, res) {
  const params = req.query;
  const room_id = params.room_id;
  Room.deleteRoom(params, function (response) {
    if (room_id === "" || room_id === undefined) {
      res.status(403).send({ result: "Invalid params" });
    }
    res.send({ result: response });
  });
};
