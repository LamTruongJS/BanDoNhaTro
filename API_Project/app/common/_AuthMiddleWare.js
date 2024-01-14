let isAuth = async function (req, res, next) {
  //req là lấy những gì ở url
  //res là trả về dữ liệu cho người dùng
  //next là có theert đi tiếp hay ko
  var _JWT = require("../common/_JWT");
  var _token = req.headers.authorization;

  if (_token) {
    try {
      const accessToken = _token.split(" ")[1];
      var auhData = await _JWT.check(accessToken);
      req.auth = auhData;
      next();
    } catch (err) {
      return res.status(403).send("Mã Token không hợp lệ");
    }
  } else {
    return res.status(401).send("401 Authorization");
  }
};

module.exports = {
  isAuth,
};
