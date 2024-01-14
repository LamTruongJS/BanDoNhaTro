var express = require("express");
var router = express.Router();

const cityController = require("../controllers/city.controller");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/city/list", cityController.getAll);
router.get("/city/detail/:id", cityController.detail);
router.post("/city/create", cityController.create);
router.get("/city/get-by-province/:id", cityController.ByProvince);

module.exports = router;
