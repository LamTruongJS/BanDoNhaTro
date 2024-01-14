var express = require("express");
var router = express.Router();
const storage = require("node-persist");
const userController = require("../controllers/user.controller");
const session = require("express-session");
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.get("/user/get-list", userController.getList);
router.post("/user/get-email", userController.getEmail);
router.post("/user/get-email/for-owner", userController.getEmailForOwner);
router.post("/user/forgot-password", userController.forgotPassword);
router.post("/user/login", userController.login);
router.post("/user/loginGoogle", userController.loginGoogle);
router.post("/user/registerGoogle", userController.registerGoogle);
router.post("/user/register", userController.register);
router.get("/user/info/:user_id", userController.info);
router.put("/user/change-info/:user_id", userController.changeInfo);
router.put("/admin/user/change-info/:user_id", userController.AdminChangeInfo);
router.get("/user/getById/:user_id", userController.getById);

router.delete("/user/delete/:user_id", userController.deleteUser);
router.post("/user/add-account", userController.addAccount);
router.get("/user/logout", (req, res) => {
  req.session = null;
});
module.exports = router;
