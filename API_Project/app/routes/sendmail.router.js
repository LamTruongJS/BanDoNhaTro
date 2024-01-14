var express = require("express");
var nodemailer = require("nodemailer");
const rand = require("../common/randPIN");
var router = express.Router();
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

router.post("/sendmail", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "truongle.281000@gmail.com",
      pass: "ysptvcnqwqhsalju",
    },
  });

  var mailOptions = {
    from: "truongle.281000@gmail.com",
    to: req.body.email,
    subject: "Please confirm your Email account",
    text: `Mã bảo mật của bạn: ${rand}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send("err");
    } else {
      res.send("success");
    }
  });
  res.send({ result: rand });
});

module.exports = router;
