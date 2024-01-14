var express = require("express");
var router = express.Router();

const wardController = require("../controllers/ward.controller");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/ward/list", wardController.getAll);
router.get("/ward/detail/:id", wardController.detail);
router.post("/ward/create", wardController.create);
router.get("/ward/get-by-city/:id", wardController.ByCity);
module.exports = router;
