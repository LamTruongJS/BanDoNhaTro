const jwt = require("jsonwebtoken");
const _APP = require("./_APP");
// make dùng để tạo mã

let make = function (user) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      { data: user },
      _APP.ACCESS_TOKEN,
      {
        algorithm: "HS256", // các mã hóa
        expiresIn: _APP.TOKEN_TIME_LIFE,
      },
      function (err, _token) {
        if (err) return reject(err);
        return resolve(_token);
      }
    );
  });
};

//check => xác thực mà đúng, hoặc sai, hết hạn
let check = function (token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, _APP.ACCESS_TOKEN, function (err, data) {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = {
  make,
  check,
};
