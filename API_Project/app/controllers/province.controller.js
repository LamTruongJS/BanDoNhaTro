var Province = require("../models/province.model");
exports.getAll = function (req, res) {
  Province.get_all(function (response) {
    res.send({ result: response });
  });
};

exports.detail = function (req, res) {
  Province.detail(req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.create = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  Province.create(data, function (response) {
    res.send({ result: response });
  });
};
