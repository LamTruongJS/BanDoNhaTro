var express = require("express");
var router = express.Router();

const motelController = require("../controllers/motel.controller");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/motel/list", motelController.getAll);
router.get("/motel/detail/:id", motelController.detail);
router.post("/motel/create", motelController.create);
router.get("/motel/search-near", motelController.searchNear);
router.get("/motel/text-search", motelController.textSearch);
router.get("/motel/detail-by-location", motelController.detailByLocation);
router.get("/motel/detail-by-id", motelController.detailByID);
router.get("/motel/type", motelController.getListTypeMotel);
router.get("/motel/type-payment", motelController.getListTypePayment);
router.get("/motel/list/:user_id", motelController.getListMotelByUser);
router.get("/owner/motel/detail-by-id", motelController.detailByIDForOwner);
router.post("/owner/motel/update", motelController.updateMotel);
router.delete("/owner/motel/delete", motelController.deleteMotel);

module.exports = router;
