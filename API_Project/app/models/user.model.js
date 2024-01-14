const db = require("../common/connect");
const crypto = require("crypto");
const rand = require("../common/randPIN");
const User = function (user) {
  this.user_id = user.user_id;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.isGoogle = user.isGoogle;
  this.role_id = user.role_id;
};
User.login = function (data, result) {
  const email = data.email;
  const password = data.password;
  const sql =
    "SELECT * FROM user WHERE email = ? AND password = ? AND isGoogle = 0";
  db.query(sql, [email, password], function (err, user) {
    if (err) {
      result(null);
    } else {
      if (user.length === 0) {
        result(user);
      } else {
        user[0].isGoogle = user[0].isGoogle.lastIndexOf(1) !== -1;

        result(user);
      }
    }
  });
};
User.loginGoogle = function (data, result) {
  const email = data.email;
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], function (err, user) {
    if (err) {
      result(err);
    } else {
      if (user.length === 0) {
        result(user);
      } else {
        user[0].isGoogle = user[0].isGoogle.lastIndexOf(1) !== -1;

        if (user[0].isGoogle) {
          result(user);
        } else {
          result({ error: "Tài khoảng đã tồn tại" });
        }
      }
    }
  });
};
User.registerGoogle = function (data, result) {
  const role = data.role ?? "";
  const username = data.username ?? "";
  const isGoogle = true;
  const role_id = role === "user" ? "ID_002" : "ID_003";
  const user_id = data.user_id ?? "";
  const email = data.email;
  const sql = "SELECT * FROM user where email = ?";
  const password = "";
  db.query(sql, [email], function (err, user) {
    if (err) {
      result(err);
    } else {
      if (user.length !== 0) {
        result({ error: "email đã tồn tại" });
      } else {
        if (role === "user" || role === "landlord") {
          const sql1 = `INSERT INTO user SET ?`;
          const value = {
            user_id,
            username,
            password: "",
            email,
            isGoogle: 1,
            role_id,
          };
          db.query(sql1, value, function (error, user) {
            if (error) {
              result(error);
            } else {
              const data = {
                user_id,
                email,
                password,
                username,
                isGoogle,
                role_id,
              };
              result(data);
            }
          });
        } else {
          result({ message: "Mã vai trò chưa đúng định dạng" });
        }
      }
    }
  });
};
User.register = function (data, result) {
  const email = data.email ?? "";
  const password = data.password ?? "";
  const username = data.username ?? "";
  const isGoogle = false;
  const role = data.role ?? "";
  const pin = data.pin ?? "";
  const numberPhone = data.numberPhone;
  let id = crypto.randomBytes(16).toString("hex");
  const role_id = role === "user" ? "ID_002" : "ID_003";

  db.query("SELECT * FROM user where email = ?", email, function (err, user) {
    if (err) {
      result(err);
    } else {
      if (user.length > 0) {
        result({ error: "email đã tồn tại" });
      } else {
        const sqlID = "SELECT user_id FROM user";
        db.query(sqlID, function (err, userID) {
          if (err) {
            result(err);
          } else {
            let IDcommon = userID.filter((item) => item === id);
            while (IDcommon.length > 0) {
              id = crypto.randomBytes(16).toString("hex");
              IDcommon = userID.filter((item) => item === id);
            }
            if (IDcommon.length === 0) {
              if (pin === "") {
                result({ pin: "Vui lòng nhập mã xác nhận" });
              } else {
                if (pin != rand) {
                  result({ pin: "Mã xác nhận không chính xác" });
                } else {
                  const sql2 = `INSERT INTO user SET ?`;
                  const value = {
                    user_id: id,
                    username,
                    password,
                    email,
                    numberPhone,
                    isGoogle: 0,
                    role_id,
                  };
                  db.query(sql2, value, function (error, user) {
                    if (error) {
                      result(error);
                    } else {
                      const data = {
                        id,
                        email,
                        password,
                        username,
                        numberPhone,
                        isGoogle,
                        role,
                      };
                      result(data);
                    }
                  });
                }
              }
            }
          }
        });
      }
    }
  });
};

User.info = function (data, result) {
  const user_id = data.user_id;
  const sql = "SELECT * FROM user WHERE user_id = ?";
  db.query(sql, [user_id], function (err, user) {
    if (err) {
      result(null);
    } else {
      if (user.length === 0) {
        result({ error: "Mã người dùng không hợp lệ" });
      } else {
        user[0].isGoogle = user[0].isGoogle.lastIndexOf(1) !== -1;

        result(user);
      }
    }
  });
};

User.getById = function (data, result) {
  const user_id = data.user_id;
  const sql = "SELECT * FROM user WHERE user_id = ?";
  db.query(sql, [user_id], function (err, user) {
    if (err) {
      result(null);
    } else {
      if (user.length === 0) {
        result({ error: "Mã người dùng không hợp lệ" });
      } else {
        const data = {
          user_id: user[0].user_id,
          username: user[0].username,
          email: user[0].email,
          numberPhone: user[0].numberPhone,
        };
        result(data);
      }
    }
  });
};
User.getEmail = function (data, result) {
  const sql = "SELECT * FROM user WHERE email like ?";
  db.query(sql, [data.email], function (err, user) {
    if (err) {
      result(null);
    } else {
      if (user.length === 0) {
        result({ error: "Email chưa tồn tại" });
      } else {
        user[0].isGoogle = user[0].isGoogle.lastIndexOf(1) !== -1;
        if (user[0].isGoogle === true) {
          result({ error: "Email đang được đăng kí bằng google" });
        } else {
          result(user);
        }
      }
    }
  });
};
User.getEmailForOwner = function (data, result) {
  const sql = "SELECT * FROM user WHERE email like ?";
  db.query(sql, [data.email], function (err, user) {
    if (err) {
      result(null);
    } else {
      if (user.length === 0) {
        result({ error: "Email chưa tồn tại" });
      } else {
        result(user);
      }
    }
  });
};
User.forgotPassword = function (data, result) {
  const sql = "UPDATE user SET password =? WHERE email like ? AND isGoogle = 0";
  db.query(sql, [data.password, data.email], function (err, user) {
    if (err) {
      result(null);
    } else {
      result({ success: "Cập nhật thành công" });
    }
  });
};
User.changeInfo = function (data, result) {
  const user_id = data.user_id;

  db.query(
    "UPDATE user SET username = ?, password =?, numberPhone=? WHERE user_id =?",
    [data.username, data.password, data.numberPhone, user_id],
    function (err, user) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};
User.AdminChangeInfo = function (data, result) {
  const user_id = data.user_id;
  console.log("dataEdit", data);
  db.query(
    "UPDATE user SET username = ?, password =?, numberPhone=?, role_id=?, email=? WHERE user_id =?",
    [
      data.username,
      data.password,
      data.numberPhone,
      data.role_id,
      data.email,
      user_id,
    ],
    function (err, user) {
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};
User.getList = function (result) {
  const sql = "SELECT * FROM user";
  db.query(sql, function (err, user) {
    if (err) {
      result(null);
    } else {
      for (let i = 0; i < user.length; i++) {
        user[i].isGoogle = user[i].isGoogle.lastIndexOf(1) !== -1;
      }
      result(user);
    }
  });
};
User.deleteUser = function (user_id, result) {
  const sql = "SELECT * FROM user WHERE user_id = ?";
  db.query(sql, user_id, function (err, userList) {
    if (err) {
      result(null);
    } else {
      if (userList.length <= 0) {
        result({ error: "Mã người dùng không hợp lệ" });
      } else {
        const sql1 = "SELECT * FROM motel WHERE user_id = ?";
        db.query(sql1, user_id, function (err, motel) {
          if (err) {
            result(null);
          } else {
            if (motel.length > 0) {
              result({ error: "Không thể xóa" });
            } else {
              const sql2 = "SELECT * FROM rent WHERE user_id = ?";
              db.query(sql2, user_id, function (err, rent) {
                if (err) {
                  result(null);
                } else {
                  if (rent.length > 0) {
                    result({ error: "Không thể xóa" });
                  } else {
                    const sql3 = "DELETE FROM user WHERE user_id = ?";
                    db.query(sql3, user_id, function (err, user) {
                      if (err) {
                        result(null);
                      } else {
                        result({ success: "Xóa thành công" });
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

User.addAccount = function (data, result) {
  const email = data.email;
  const password = data.password;
  const username = data.username;
  const isGoogle = false;
  const role_id = data.role_id;

  const numberPhone = data.numberPhone;
  let id = crypto.randomBytes(16).toString("hex");

  const sql = "SELECT * FROM user where email = ?";
  db.query(sql, [email], function (err, user) {
    if (err) {
      result(err);
    } else {
      if (user.length !== 0) {
        result({ error: "email đã tồn tại" });
      } else {
        const sqlID = "SELECT user_id FROM user";
        db.query(sqlID, function (err, userID) {
          if (err) {
            result(err);
          } else {
            let IDcommon = userID.filter((item) => item === id);
            while (IDcommon.length > 0) {
              id = crypto.randomBytes(16).toString("hex");
              IDcommon = userID.filter((item) => item === id);
            }
            if (IDcommon.length === 0) {
              const sql2 = `INSERT INTO user SET ?`;
              const value = {
                user_id: id,
                username,
                password,
                email,
                numberPhone,
                isGoogle: 0,
                role_id,
              };
              db.query(sql2, value, function (error, user) {
                if (error) {
                  result(error);
                } else {
                  const data = {
                    id,
                    email,
                    password,
                    username,
                    numberPhone,
                    isGoogle,
                    role_id,
                  };
                  result(data);
                }
              });
            }
          }
        });
      }
    }
  });
};
module.exports = User;
