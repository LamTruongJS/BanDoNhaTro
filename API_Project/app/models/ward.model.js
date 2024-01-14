const db = require("../common/connect");
const Ward = function (ward) {
  this.ward_id = ward.ward_id;
  this.ward_name = ward.ward_name;
};
Ward.get_all = function (result) {
  db.query("SELECT * FROM ward", function (err, ward) {
    if (err) {
      result(null);
    } else {
      result(ward);
    }
  });
};
Ward.detail = function (id, result) {
  db.query("SELECT * FROM ward WHERE ward_id = ?", id, function (err, ward) {
    if (err || ward.length == 0) {
      result(null);
    } else {
      result(ward[0]); // vì chỉ cần trả về 1 phần tử object với id đó, nếu không truyền 0 thì nó sẽ trả về dạng mảng
    }
  });
};
Ward.create = function (data, result) {
  db.query("INSERT INTO ward SET ?", data, function (err, ward) {
    if (err) {
      result(null);
    } else {
      result({ ...data });
    }
  });
};
Ward.ByCity = function (id, result) {
  db.query("SELECT * FROM ward WHERE city_id like ?", id, function (err, city) {
    if (err) {
      result(null);
    } else {
      result(city);
    }
  });
};
module.exports = Ward;
