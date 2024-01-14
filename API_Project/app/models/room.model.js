const db = require("../common/connect");
const crypto = require("crypto");
const Room = function (room) {
  this.room_id = room.room_id;
  this.room_name = room.room_name;
  this.room_price = room.room_price;
  this.max_people = room.max_people;
  this.description = room.description;
  this.floor = room.floor;
  this.status = room.status;
  this.motel_id = room.motel_id;
  this.type_room_id = room.type_room_id;
  this.furniture_id = room.furniture_id;
  this.service_id = room.service_id;
};

Room.list = function (data, result) {
  const motel_id = data.motel_id ?? "";
  db.query(
    "SELECT * FROM room WHERE motel_id = ?",
    [motel_id],
    function (err, room) {
      if (err) {
        result(null);
      } else {
        if (room.length > 0) {
          db.query("SELECT * FROM rent", function (err, rent) {
            if (err) {
              result(err);
            } else {
              for (let i = 0; i < room.length; i++) {
                if (rent.length > 0) {
                  const resultStatus = rent.filter(
                    (item) => item.room_id === room[i].room_id
                  );
                  if (resultStatus.length > 0) {
                    room[i] = { ...room[i], status: "Đã thuê" };
                  } else {
                    room[i] = { ...room[i], status: "Còn trống" };
                  }
                } else {
                  room[i] = { ...room[i], status: "Còn trống" };
                }
              }
            }
            result(room);
          });
        } else {
          result(room);
        }
      }
    }
  );
};
Room.detail = function (room_id, result) {
  db.query(
    "SELECT * FROM room WHERE room_id = ?",
    [room_id],
    function (err, room) {
      if (err) {
        result(null);
      } else {
        if (room.length > 0) {
          const motel_id = room[0].motel_id;
          db.query(
            "SELECT * FROM motel WHERE motel_id = ?",
            [motel_id],
            function (err, motel) {
              if (err) {
                result(null);
              } else {
                const room_id = room[0].room_id;
                db.query(
                  "SELECT * FROM rent where room_id = ?",
                  [room_id],
                  function (err, rent) {
                    if (err) {
                      result(null);
                    } else {
                      if (rent.length > 0) {
                        const newData = {
                          ...room[0],
                          address: motel[0].address_basic,
                          motel_name: motel[0].motel_name,
                          status: "Đã Thuê",
                        };
                        result(newData);
                      } else {
                        const newData = {
                          ...room[0],
                          address: motel[0].address_basic,
                          motel_name: motel[0].motel_name,
                          status: "Còn trống",
                        };
                        result(newData);
                      }
                    }
                  }
                );
              }
            }
          );
        } else {
          result(room);
        }
      }
    }
  );
};
Room.filter = function (data, result) {
  const motel_id = data.motel_id;
  const price_gte = data.price_gte ?? "";
  const price_lte = data.price_lte ?? "";
  const area = data.area ?? "";
  const status = data.status ?? "";
  db.query(
    "SELECT * FROM room WHERE motel_id = ?",
    [motel_id],
    function (err, roomList) {
      if (err) {
        result(null);
      } else {
        db.query("SELECT room_id FROM rent", function (err, rent) {
          if (err) {
            result(err);
          } else {
            let newData = [];
            const listRent = [];
            rent.forEach((item) => listRent.push(item.room_id));
            if (price_lte && price_gte) {
              const newValue = roomList.filter((item) => {
                return (
                  Number(price_gte) <= item.room_price &&
                  item.room_price <= Number(price_lte)
                );
              });
              roomList = [...newValue];
              newData = [...newValue];
            }
            if (area) {
              const newValue = roomList.filter((item) => {
                const value = Number(area) - Number(item.area);
                return -5 <= value && value <= 5;
              });
              roomList = [...newValue];
              newData = [...newValue];
            }
            if (status) {
              if (rent.length > 0) {
                if (parseInt(status) === 1) {
                  const valueStatus = roomList.filter((item) =>
                    listRent.includes(item.room_id)
                  );
                  roomList = [...valueStatus];
                  newData = [...valueStatus];
                } else if (parseInt(status) === 0) {
                  const valueStatus = roomList.filter(
                    (item) => !listRent.includes(item.room_id)
                  );
                  roomList = [...valueStatus];
                  newData = [...valueStatus];
                }
              }
            }

            newData.forEach((item, index) => {
              const isStatus = listRent.includes(item.room_id);
              newData[index] = {
                ...newData[index],
                status: isStatus ? "Đã thuê" : "Còn trống",
              };
            });
            result(newData);
          }
        });
      }
    }
  );
};
Room.getListTypeRoom = function (result) {
  db.query("SELECT * FROM type_room", function (err, typeRoom) {
    if (err) {
      result(null);
    } else {
      result(typeRoom);
    }
  });
};
Room.addRoom = function (data, result) {
  let id = crypto.randomBytes(16).toString("hex");
  const sqlID = "SELECT room_id FROM room";
  db.query(sqlID, function (err, roomID) {
    if (err) {
      result(err);
    } else {
      let IDcommon = roomID.filter((item) => item === id);
      while (IDcommon.length > 0) {
        id = crypto.randomBytes(16).toString("hex");
        IDcommon = roomID.filter((item) => item === id);
      }
      if (IDcommon.length === 0) {
        const newData = {
          ...data,
          room_id: id,
        };
        db.query("INSERT INTO room SET ?", newData, function (err, room) {
          if (err) {
            result(null);
          } else {
            result({ ...newData });
          }
        });
      }
    }
  });
};
Room.updateRoom = function (data, result) {
  db.query(
    "UPDATE room SET room_name = ?, room_price = ?, area = ?, max_people = ?, description = ?, floor = ?, furniture = ?, service = ?, type_room_id = ?  WHERE room_id = ? AND motel_id = ?",
    [
      data.room_name,
      data.room_price,
      data.area,
      data.max_people,
      data.description,
      data.floor,
      data.furniture,
      data.service,
      data.type_room_id,
      data.room_id,
      data.motel_id,
    ],
    function (err, motel) {
      if (err || motel.length == 0) {
        result(null);
      } else {
        result("Cập nhật thành công"); // vì chỉ cần trả về 1 phần tử object với id đó, nếu không truyền 0 thì nó sẽ trả về dạng mảng
      }
    }
  );
};
Room.deleteRoom = function (data, result) {
  const room_id = data.room_id ?? "";
  console.log(room_id);
  db.query("DELETE FROM room WHERE room_id = ?", room_id, function (err, room) {
    if (err) {
      result(null);
    } else {
      result("Xóa Thành Công");
    }
  });
};
module.exports = Room;
