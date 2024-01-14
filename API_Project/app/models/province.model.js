const db = require("../common/connect");
const Province = function (province) {
  this.province_id = province.province_id;
  this.province_name = province.province_name;
};
Province.get_all = function (result) {
  db.query("SELECT * FROM province", function (err, province) {
    if (err) {
      result(null);
    } else {
      result(province);
    }
  });
};
Province.detail = function (id, result) {
  db.query(
    "SELECT * FROM province WHERE province_id = ?",
    id,
    function (err, province) {
      if (err || province.length == 0) {
        result(null);
      } else {
        result(province[0]); // vì chỉ cần trả về 1 phần tử object với id đó, nếu không truyền 0 thì nó sẽ trả về dạng mảng
      }
    }
  );
};
Province.create = function (data, result) {
  db.query("INSERT INTO province SET ?", data, function (err, province) {
    if (err) {
      result(null);
    } else {
      result({ ...data });
    }
  });
};

module.exports = Province;
