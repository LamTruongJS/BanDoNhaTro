var express = require("express");
var router = express.Router();

const rentController = require("../controllers/rent.controller");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.get("/rent/list", rentController.listAll);
router.post("/rent/add", rentController.addRent);
router.get("/rent/:user_id", rentController.listByID);
router.get("/rent/room/:room_id", rentController.listByRoomID);
router.delete("/rent/delete", rentController.deleteRent);
module.exports = router;
