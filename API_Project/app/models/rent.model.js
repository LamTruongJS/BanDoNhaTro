const db = require("../common/connect");
const crypto = require("crypto");
const Rent = function (rent) {
  this.rent_id = rent.rent_id;
  this.date_start = rent.date_start;
  this.date_end = rent.date_end;
  this.time_payment = rent.time_payment;
  this.user_id = rent.user_id;
  this.room_id = rent.room_id;
};
Rent.listByID = function (data, result) {
  const user_id = data.user_id ?? "";
  db.query(
    "SELECT * FROM rent WHERE user_id = ?",
    [user_id],
    function (err, rent) {
      if (err) {
        result(null);
      } else {
        if (rent.length > 0) {
          result(rent);
        } else {
          result(rent);
        }
      }
    }
  );
};
Rent.listByRoomID = function (data, result) {
  const room_id = data.room_id ?? "";
  db.query(
    "SELECT * FROM rent WHERE room_id = ?",
    [room_id],
    function (err, rent) {
      if (err) {
        result(null);
      } else {
        if (rent.length > 0) {
          result(rent);
        } else {
          result(rent);
        }
      }
    }
  );
};
Rent.listAll = function (result) {
  db.query("SELECT * FROM rent", function (err, rent) {
    if (err) {
      result(null);
    } else {
      result(rent);
    }
  });
};
Rent.deleteRent = function (data, result) {
  const user_id = data.user_id ?? "";
  const room_id = data.room_id ?? "";
  console.log(user_id, room_id);
  db.query(
    "DELETE FROM rent WHERE user_id = ? AND room_id = ?",
    [user_id, room_id],
    function (err, rent) {
      if (err) {
        result(null);
      } else {
        result("Xóa Thành Công");
      }
    }
  );
};
Rent.addRent = function (data, result) {
  const user_id = data.user_id ?? "";
  const room_id = data.room_id ?? "";
  const date_start = data.date_start ?? "";
  const date_end = data.date_end ?? "";
  const time_payment = data.time_payment ?? "";
  const price = data.price ?? "";
  let id = crypto.randomBytes(16).toString("hex");
  db.query(
    "SELECT * FROM rent WHERE room_id = ?",
    [room_id],
    function (err, room) {
      if (err) {
        result(err);
      } else {
        if (room.length !== 0) {
          result({ error: "Phòng đang được thuê" });
        } else {
          db.query("SELECT rent_id FROM rent", function (err, idList) {
            if (err) {
              result(err);
            } else {
              let IDcommon = idList.filter((item) => item === id);
              while (IDcommon.length > 0) {
                id = crypto.randomBytes(16).toString("hex");
                IDcommon = idList.filter((item) => item === id);
              }
              if (IDcommon.length === 0) {
                const value = {
                  rent_id: id,
                  date_start: date_start,
                  date_end: date_end,
                  price: price,
                  user_id: user_id,
                  room_id: room_id,
                  time_payment: time_payment,
                };
                db.query("INSERT INTO rent SET ?", value, function (err, rent) {
                  if (err) {
                    result(err);
                  } else {
                    result({ success: "Thêm thành công" });
                  }
                });
              }
            }
          });
        }
      }
    }
  );
};
module.exports = Rent;
