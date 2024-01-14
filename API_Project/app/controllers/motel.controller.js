var Motel = require("../models/motel.model");
exports.getAll = function (req, res) {
  Motel.get_all(function (response) {
    res.send({ result: response });
  });
};

exports.detail = function (req, res) {
  Motel.detail(req.params.id, function (response) {
    res.send({ result: response });
  });
};

exports.create = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  Motel.create(data, function (response) {
    res.send({ result: response });
  });
};

exports.searchNear = function (req, res) {
  const params = req.query;
  Motel.searchNear(params, function (response) {
    res.send({ result: response });
  });
};
exports.textSearch = function (req, res) {
  const params = req.query;
  Motel.textSearch(params, function (response) {
    res.send({ result: response });
  });
};
exports.detailByLocation = function (req, res) {
  const params = req.query;
  const lat = params.lat;
  const lng = params.lng;
  Motel.detailByLocation(params, function (response) {
    if (lat === "" || lng === "" || lat === undefined || lng === undefined) {
      res.status(403).send({ result: "Invalid params" });
    }
    res.send({ result: response });
  });
};
exports.detailByID = function (req, res) {
  const params = req.query;
  const motel_id = params.motel_id;

  Motel.detailByID(params, function (response) {
    if (motel_id === "" || motel_id === undefined) {
      res.status(403).send({ result: "Invalid params" });
    }
    res.send({ result: response });
  });
};
exports.detailByIDForOwner = function (req, res) {
  const params = req.query;
  const motel_id = params.motel_id;

  Motel.detailByIDForOwner(params, function (response) {
    if (motel_id === "" || motel_id === undefined) {
      res.status(403).send({ result: "Invalid params" });
    }
    res.send({ result: response });
  });
};
exports.getListTypeMotel = function (req, res) {
  Motel.getListTypeMotel(function (response) {
    res.send({ result: response });
  });
};
exports.getListTypePayment = function (req, res) {
  Motel.getListTypePayment(function (response) {
    res.send({ result: response });
  });
};
exports.getListMotelByUser = function (req, res) {
  Motel.getListMotelByUser(req.params.user_id, function (response) {
    res.send({ result: response });
  });
};
exports.updateMotel = function (req, res) {
  // lấy data từ form
  const data = req.body; // cài 1 gói là body-parser
  Motel.updateMotel(data, function (response) {
    res.send({ result: response });
  });
};
exports.deleteMotel = function (req, res) {
  const params = req.query;
  const motel_id = params.motel_id;
  Motel.deleteMotel(params, function (response) {
    if (motel_id === "" || motel_id === undefined) {
      res.status(403).send({ result: "Invalid params" });
    }
    res.send({ result: response });
  });
};
