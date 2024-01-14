var express = require("express");
var router = express.Router();

const roomController = require("../controllers/room.controller");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/room/list", roomController.list);
router.get("/room/:room_id", roomController.detail);
router.get("/motel/:motel_id/filter", roomController.filter);
router.get("/room/list/type", roomController.getListTypeRoom);
router.post("/room/add-room", roomController.addRoom);
router.post("/owner/room/update", roomController.updateRoom);
router.delete("/owner/room/delete", roomController.deleteRoom);
module.exports = router;
