var City = require("../models/city.model");
exports.getAll = function (req, res) {
  City.get_all(function (response) {
    res.send({ result: response });
  });
};

exports.detail = function (req, res) {
  City.detail(req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.create = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  City.create(data, function (response) {
    res.send({ result: response });
  });
};
exports.ByProvince = function (req, res) {
  City.ByProvince(req.params.id, function (response) {
    res.send({ result: response });
  });
};
