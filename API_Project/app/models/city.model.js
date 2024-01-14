const db = require("../common/connect");
const City = function (city) {
  this.city_id = city.city_id;
  this.city_name = city.city_name;
};
City.get_all = function (result) {
  db.query("SELECT * FROM city", function (err, city) {
    if (err) {
      result(null);
    } else {
      result(city);
    }
  });
};
City.detail = function (id, result) {
  db.query("SELECT * FROM city WHERE city_id = ?", id, function (err, city) {
    if (err || city.length == 0) {
      result(null);
    } else {
      result(city[0]); // vì chỉ cần trả về 1 phần tử object với id đó, nếu không truyền 0 thì nó sẽ trả về dạng mảng
    }
  });
};
City.create = function (data, result) {
  db.query("INSERT INTO city SET ?", data, function (err, city) {
    if (err) {
      result(null);
    } else {
      result({ ...data });
    }
  });
};
City.ByProvince = function (id, result) {
  db.query(
    "SELECT * FROM city WHERE province_id like ?",
    id,
    function (err, city) {
      if (err) {
        result(null);
      } else {
        result(city); // vì chỉ cần trả về 1 phần tử object với id đó, nếu không truyền 0 thì nó sẽ trả về dạng mảng
      }
    }
  );
};
module.exports = City;
