require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const fs = require("fs");
const PORT = 8888;
const provinceRouter = require("./app/routes/province.router");
const cityRouter = require("./app/routes/city.router");
const wardRouter = require("./app/routes/ward.router");
const motelRouter = require("./app/routes/motel.router");
const userRouter = require("./app/routes/user.router");
const roomRouter = require("./app/routes/room.router");
const rentRouter = require("./app/routes/rent.router");

const sendmailRouter = require("./app/routes/sendmail.router");
const _AuthMiddleware = require("./app/common/_AuthMiddleWare");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false })); // nếu bằng true thì dữ liệu dễ gặp lỗi về kí tụ
app.use(bodyParser.json());

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 },
  })
);
//create API
app.use("/", userRouter);
app.use("/", sendmailRouter);

app.use(_AuthMiddleware.isAuth);
app.use("/", provinceRouter);
app.use("/", cityRouter);
app.use("/", wardRouter);
app.use("/", motelRouter);
app.use("/", roomRouter);
app.use("/", rentRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  if (res.method == "OPTIONS") {
    res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}`);
});
