const db = require("../common/connect");
const distance = require("../common/distance");
const removeAccents = require("../common/removeAccents");
const LOCATION_SCHOOL = require("../constants/locationSchool");
const crypto = require("crypto");
const Motel = function (motel) {
  this.motel_id = motel.motel_id;
  this.motel_name = motel.motel_name;
  this.address_basic = motel.address_basic;
  this.ward_id = motel.ward_id;
  this.city_id = motel.city_id;
  this.province_id = motel.province_id;
  this.lat = motel.lat;
  this.lng = motel.lng;
  this.phone_number = motel.phone_number;
  this.image = motel.image;
  this.description = motel.description;
  this.type_motel_id = motel.type_motel_id;
  this.type_payment_id = motel.type_payment_id;
  this.user_id = motel.user_id;
};
Motel.get_all = function (result) {
  db.query("SELECT * FROM motel", function (err, motel) {
    if (err) {
      result(null);
    } else {
      result(motel);
    }
  });
};
Motel.detail = function (id, result) {
  db.query("SELECT * FROM motel WHERE motel_id = ?", id, function (err, motel) {
    if (err || motel.length == 0) {
      result(null);
    } else {
      result(motel[0]); // vì chỉ cần trả về 1 phần tử object với id đó, nếu không truyền 0 thì nó sẽ trả về dạng mảng
    }
  });
};
Motel.create = function (data, result) {
  let id = crypto.randomBytes(16).toString("hex");
  const sqlID = "SELECT motel_id FROM motel";
  db.query(sqlID, function (err, motelID) {
    if (err) {
      result(err);
    } else {
      let IDcommon = motelID.filter((item) => item === id);
      while (IDcommon.length > 0) {
        id = crypto.randomBytes(16).toString("hex");
        IDcommon = motelID.filter((item) => item === id);
      }
      if (IDcommon.length === 0) {
        const newHashtag = removeAccents(data.hashtag);

        const newData = {
          ...data,
          motel_id: id,
          hashtag: newHashtag,
        };

        db.query("INSERT INTO motel SET ?", newData, function (err, motel) {
          if (err) {
            result(err);
          } else {
            console.log(newData);
            result({ ...newData });
          }
        });
      }
    }
  });
};
Motel.searchNear = function (data, result) {
  db.query("SELECT * FROM motel", data, function (err, motel) {
    const dataResult = [];
    const text = data.text ?? "";
    const locationStart = {
      lat: data.lat ?? "",
      lng: data.lng ?? "",
    };
    const radius = data.radius ?? 0;
    const price_lte = data.price_lte ?? "";
    const price_gte = data.price_gte ?? "";

    if (err) {
      result(null);
    } else {
      if (motel.length === 0) {
        result(motel);
      } else {
        for (let i = 0; i < motel.length; i++) {
          let isConfirm = {
            isPrice: false,
            isRadius: false,
            isText: false,
          };
          const location = {
            lat: motel[i].lat,
            lng: motel[i].lng,
          };
          console.log(
            "khoảng cách:",
            i,
            ": ",
            distance(locationStart, location)
          );
          console.log(Number(radius));
          if (Number(radius) >= 1) {
            if (distance(locationStart, location) <= Number(radius)) {
              isConfirm.isRadius = true;
            } else {
              isConfirm.isRadius = false;
            }
          } else {
            isConfirm.isRadius = true;
          }

          if (price_gte != "" && price_lte != "") {
            if (Number(price_gte) <= Number(price_lte)) {
              const price = motel[i].price__basic;

              if (Number(price_gte) <= price && price <= Number(price_lte)) {
                isConfirm.isPrice = true;
              } else {
                isConfirm.isPrice = false;
              }
            } else {
              isConfirm.isPrice = false;
            }
          } else {
            isConfirm.isPrice = true;
          }
          if (text !== "") {
            const conditionQuery = (searchText, name, address, hashtag) => {
              if (removeAccents(searchText).includes(removeAccents(name))) {
                return true;
              }
              if (removeAccents(name).includes(removeAccents(searchText))) {
                return true;
              }
              if (removeAccents(searchText).includes(removeAccents(address))) {
                return true;
              }
              if (removeAccents(address).includes(removeAccents(searchText))) {
                return true;
              }
              const valueHashtag = removeAccents(hashtag);
              const array = valueHashtag.split(",");
              if (array.includes(removeAccents(searchText))) {
                return true;
              }
              return false;
            };
            const name = motel[i].motel_name;
            const address = motel[i].address_basic;
            const hashtag = motel[i].hashtag;
            if (conditionQuery(text, name, address, hashtag)) {
              isConfirm.isText = true;
            } else {
              isConfirm.isText = false;
            }
          } else {
            isConfirm.isPrice = false;
          }
          if (
            isConfirm.isPrice === true &&
            isConfirm.isText === true &&
            isConfirm.isRadius === true
          ) {
            console.log("confirm");
            dataResult.push(motel[i]);
          }
          console.log(isConfirm);
        }
        console.log(dataResult);
        result(dataResult);
      }
    }
  });
};
Motel.textSearch = function (data, result) {
  // data này là trên controller trả xuống
  console.log(data);

  db.query("SELECT * FROM motel", data, function (err, motel) {
    // motel là kết quả truy vấn
    const dataResult = [];
    const text = data.text ?? "";
    const temp = [...text];
    if (err) {
      result(null);
    } else {
      if (removeAccents(data.text) === "") {
        result([]);
      } else {
        if (temp.length <= 2) {
          result([]);
        } else {
          for (let i = 0; i < motel.length; i++) {
            const conditionQuery = (searchText, name, address, hashtag) => {
              if (removeAccents(searchText).includes(removeAccents(name))) {
                return true;
              }
              if (removeAccents(name).includes(removeAccents(searchText))) {
                return true;
              }
              if (removeAccents(searchText).includes(removeAccents(address))) {
                return true;
              }
              if (removeAccents(address).includes(removeAccents(searchText))) {
                return true;
              }
              const valueHashtag = removeAccents(hashtag);
              const array = valueHashtag.split(",");
              if (array.includes(removeAccents(searchText))) {
                return true;
              }
              return false;
            };
            const name = motel[i].motel_name;
            const address = motel[i].address_basic;
            const hashtag = motel[i].hashtag;
            if (conditionQuery(text, name, address, hashtag)) {
              dataResult.push(motel[i]);
            }
          }
          result(dataResult);
        }
      }
    }
  });
};

Motel.detailByLocation = function (data, result) {
  const lat = data.lat ?? "";
  const lng = data.lng ?? "";
  db.query(
    "SELECT * FROM motel where lat like ? AND lng like ?",
    [lat, lng],
    function (err, motel) {
      if (err) {
        result(null);
      } else {
        result(motel);
      }
    }
  );
};
Motel.detailByID = function (data, result) {
  const motel_id = data.motel_id ?? "";
  db.query(
    "SELECT * FROM motel where motel_id like ?",
    [motel_id],
    function (err, motel) {
      if (err) {
        result(null);
      } else {
        if (motel.length > 0) {
          const type_id = motel[0].type_motel_id;
          db.query(
            "SELECT * FROM type_motel WHERE type_motel_id = ?",
            [type_id],
            function (err, dataTypeMotel) {
              if (err) {
                result(err);
              } else {
                type_motel_name = dataTypeMotel[0].type_motel_name;
                delete motel[0].type_motel_id;
                const user_id = motel[0].user_id;
                const type_payment_id = motel[0].type_payment_id;
                db.query(
                  "SELECT * FROM type_payment WHERE type_payment_id = ?",
                  [type_payment_id],
                  function (err, resultTypePayment) {
                    if (err) {
                      result(null);
                    } else {
                      type_payment_name =
                        resultTypePayment[0].type_payment_name;
                      delete motel[0].type_payment_id;
                      db.query(
                        "SELECT * FROM user WHERE user_id = ?",
                        [user_id],
                        function (err, dataUser) {
                          if (err) {
                            result(err);
                          } else {
                            const user = {
                              user_id: dataUser[0].user_id,
                              username: dataUser[0].username,
                              email: dataUser[0].email,
                              numberPhone: dataUser[0].numberPhone,
                            };
                            delete motel[0].user_id;
                            const newData = [
                              {
                                ...motel[0],
                                type_motel_name,
                                type_payment_name,
                                user,
                              },
                            ];

                            result(newData);
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          result(motel);
        }
      }
    }
  );
};
Motel.detailByIDForOwner = function (data, result) {
  const motel_id = data.motel_id ?? "";
  db.query(
    "SELECT * FROM motel where motel_id like ?",
    [motel_id],
    function (err, motel) {
      if (err) {
        result(null);
      } else {
        result(motel);
      }
    }
  );
};

Motel.getListTypeMotel = function (result) {
  db.query("SELECT * FROM type_motel", function (err, typeMotel) {
    if (err) {
      result(null);
    } else {
      result(typeMotel);
    }
  });
};
Motel.getListTypePayment = function (result) {
  db.query("SELECT * FROM type_payment", function (err, typePayment) {
    if (err) {
      result(null);
    } else {
      result(typePayment);
    }
  });
};
Motel.getListMotelByUser = function (user_id, result) {
  db.query(
    "SELECT * FROM motel WHERE user_id = ?",
    user_id,
    function (err, motel) {
      if (err) {
        result(null);
      } else {
        result(motel);
      }
    }
  );
};
Motel.updateMotel = function (data, result) {
  db.query(
    "UPDATE motel SET motel_name = ?, address_basic = ?,price__basic = ?, ward_id = ?, city_id = ?, province_id = ?, lat = ?, lng = ?, phone_number = ?, hashtag = ?, description = ?, type_motel_id= ?, type_payment_id = ?  WHERE motel_id =?",
    [
      data.motel_name,
      data.address_basic,
      data.price__basic,
      data.ward_id,
      data.city_id,
      data.province_id,
      data.lat,
      data.lng,
      data.phone_number,
      data.hashtag,
      data.description,
      data.type_motel_id,
      data.type_payment_id,
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

Motel.deleteMotel = function (data, result) {
  const motel_id = data.motel_id ?? "";
  db.query(
    "DELETE FROM room WHERE motel_id = ?",
    motel_id,
    function (err, room) {
      if (err) {
        result(null);
      } else {
        db.query(
          "DELETE FROM motel WHERE motel_id =?",
          motel_id,
          function (err, motel) {
            if (err) {
              result(null);
            } else {
              result("Xóa Thành Công");
            }
          }
        );
      }
    }
  );
};
module.exports = Motel;
