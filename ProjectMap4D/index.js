require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const path = require("path");
const fs = require("fs");
const PORT = 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//navigation website
app.get("/login", (req, res) => {
  res.render("Login/login");
});
app.get("/Register", (req, res) => {
  res.render("Register/register");
});
app.get("/forgot-password", (req, res) => {
  res.render("ForgotPassword/forgotPassword");
});

app.get("/test-map", (req, res) => {
  res.render("testMap/testMap");
});

app.get("/", (req, res) => {
  res.redirect("/map");
});
app.get("/map", (req, res) => {
  let lat = req.query.lat;
  let lng = req.query.lng;
  res.render("Map/map", { lat, lng });
});
app.get("/Motel/:motel_id", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("Motel/motel", { motel_id: motel_id });
});
app.get("/Motel/:motel_id/list", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("ListRoom/listRoom", { motel_id: motel_id });
});
app.get("/Motel/:motel_id/room/:room_id", (req, res) => {
  let room_id = req.params.room_id;
  let motel_id = req.params.motel_id;
  res.render("Room/room", { room_id: room_id, motel_id: motel_id });
});
app.get("/account/settings", (req, res) => {
  res.render("Account/account");
});
app.get("/room-of-me", (req, res) => {
  const rent_id = req.params.rent_id;
  res.render("Rent/rent");
});

// Owner
app.get("/owner/add-motel", (req, res) => {
  res.render("AddMotel/addMotel");
});
app.get("/owner/add-room", (req, res) => {
  res.render("AddRoom/addRoom");
});
app.get("/owner/list-motel", (req, res) => {
  res.render("ListMotel/listMotel");
});
app.get("/owner/motel/:motel_id", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("OwnerMotel/ownerMotel", { motel_id: motel_id });
});
app.get("/owner/motel/:motel_id/list", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("OwnerListRoom/ownerListRoom", { motel_id: motel_id });
});
app.get("/owner/motel/:motel_id/room/:room_id", (req, res) => {
  let room_id = req.params.room_id;
  let motel_id = req.params.motel_id;
  res.render("OwnerRoom/ownerRoom", { room_id: room_id, motel_id: motel_id });
});
app.get("/owner/edit-motel", (req, res) => {
  res.render("EditMotel/editMotel");
});
app.get("/owner/edit-room", (req, res) => {
  res.render("EditRoom/editRoom");
});
app.get("/owner/add-room/byUI", (req, res) => {
  res.render("AddRoomByUI/addRoomByUI");
});
app.get("/owner/add-motel/byUI", (req, res) => {
  res.render("AddMotelByUI/addMotelByUI");
});
app.get("/owner/account/settings", (req, res) => {
  res.render("AccountOwner/accountOwner");
});
app.get("/owner/management/tenants", (req, res) => {
  res.render("OwnerManagementUser/ownerManagementUser");
});
app.get("/owner/delete-motel", (req, res) => {
  res.render("DeleteMotel/deleteMotel");
});
app.get("/owner/delete-room", (req, res) => {
  res.render("DeleteRoom/deleteRoom");
});
app.get("/owner/add-customer", (req, res) => {
  res.render("OwnerAddCustomer/ownerAddCustomer");
});

// admin page
app.get("/admin/manager-user", (req, res) => {
  res.render("AdminManagerUser/adminManagerUser");
});
app.get("/admin/manager/list-motel", (req, res) => {
  res.render("AdminListMotel/adminListMotel");
});
app.get("/admin/manager/motel/:motel_id", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("AdminMotelDetail/adminMotelDetail", { motel_id: motel_id });
});
app.get("/admin/manager/add-room-excel/:motel_id", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("AdminAddRoom/adminAddRoom", { motel_id: motel_id });
});
app.get("/admin/manager/add-room/:motel_id", (req, res) => {
  let motel_id = req.params.motel_id;
  res.render("AdminAddRoomByUI/adminAddRoomByUI", { motel_id: motel_id });
});
app.get("/admin/manager/choose-owner", (req, res) => {
  res.render("AdminChooseOwner/adminChooseOwner");
});
app.get("/admin/add-motel-byUI/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  res.render("AdminAddMotelByUI/adminAddMotelByUI", { user_id: user_id });
});
app.get("/admin/add-motel/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  res.render("AdminAddMotel/adminAddMotel", { user_id: user_id });
});

//
app.get("/not-found", function (req, res) {
  res.status(404).render("NotFound/notFound");
});
app.get("*", function (req, res) {
  res.status(404).render("NotFound/notFound");
});

app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}`);
});
