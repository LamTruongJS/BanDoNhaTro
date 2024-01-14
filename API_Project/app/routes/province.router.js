var express = require("express");
var router = express.Router();

const provinceController = require("../controllers/province.controller");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/province/list", provinceController.getAll);
router.get("/province/detail/:id", provinceController.detail);
router.post("/province/create", provinceController.create);

module.exports = router;
