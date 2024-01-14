var Ward = require("../models/ward.model");
exports.getAll = function (req, res) {
  Ward.get_all(function (response) {
    res.send({ result: response });
  });
};

exports.detail = function (req, res) {
  Ward.detail(req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.create = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  Ward.create(data, function (response) {
    res.send({ result: response });
  });
};
exports.ByCity = function (req, res) {
  Ward.ByCity(req.params.id, function (response) {
    res.send({ result: response });
  });
};
