var User = require("../models/user.model");
var JWT = require("../common/_JWT");
exports.login = async function (req, res) {
  const data = req.body;
  User.login(data, async function (response) {
    if (data.email && data.password) {
      if (response.length > 0) {
        const _token = await JWT.make(response);
        res.send({
          result: [
            {
              user: response,
              token: _token,
            },
          ],
        });
      } else {
        res.send({ result: response });
      }
    } else {
      res.status(403).send("");
    }
  });
};

exports.loginGoogle = async function (req, res) {
  const data = req.body;
  User.loginGoogle(data, async function (response) {
    if (data.email) {
      if (response.length > 0) {
        const _token = await JWT.make(response);
        res.send({
          result: [
            {
              user: response,
              token: _token,
            },
          ],
        });
      } else {
        res.send({ result: response });
      }
    } else {
      res.status(403).send("");
    }
  });
};
exports.registerGoogle = async function (req, res) {
  const data = req.body;
  User.registerGoogle(data, async function (response) {
    if (response.error !== undefined) {
      res.status(409).send({ result: response });
    } else {
      if (response.message !== undefined) {
        res.status(403).send({ result: response });
      } else {
        if (response) {
          const _token = await JWT.make(response);
          res.send({
            result: [
              {
                user: response,
                token: _token,
              },
            ],
          });
        } else {
          res.send({ result: response });
        }
      }
    }
  });
};
exports.addAccount = async function (req, res) {
  const data = req.body;
  User.addAccount(data, async function (response) {
    if (response.error !== undefined) {
      res.status(409).send({ result: response });
    } else {
      if (response.message !== undefined) {
        res.status(403).send({ result: response });
      } else {
        if (response) {
          const _token = await JWT.make(response);
          res.send({
            result: [
              {
                user: response,
                token: _token,
              },
            ],
          });
        } else {
          res.send({ result: response });
        }
      }
    }
  });
};

exports.register = function (req, res) {
  const data = req.body;

  User.register(data, function (response) {
    if (response.error !== undefined) {
      res.status(409).send({ result: response });
    } else {
      res.send({ result: response });
    }
  });
};
exports.info = function (req, res) {
  const data = req.params;
  User.info(data, function (response) {
    res.send({ result: response });
  });
};
exports.getById = function (req, res) {
  const data = req.params;
  User.getById(data, function (response) {
    res.send({ result: response });
  });
};

exports.getEmail = function (req, res) {
  const value = req.body;
  User.getEmail(value, function (response) {
    res.send({ result: response });
  });
};
exports.getEmailForOwner = function (req, res) {
  const value = req.body;
  User.getEmailForOwner(value, function (response) {
    res.send({ result: response });
  });
};
exports.forgotPassword = function (req, res) {
  const value = req.body;
  User.forgotPassword(value, function (response) {
    res.send({ result: response });
  });
};
exports.changeInfo = function (req, res) {
  const user_id = req.params;
  const value = req.body;
  const data = {
    ...user_id,
    ...value,
  };
  User.changeInfo(data, function (response) {
    res.send({ result: response });
  });
};
exports.AdminChangeInfo = function (req, res) {
  const user_id = req.params;
  const value = req.body;
  const data = {
    ...user_id,
    ...value,
  };
  User.AdminChangeInfo(data, function (response) {
    res.send({ result: response });
  });
};

exports.deleteUser = function (req, res) {
  const user_id = req.params.user_id;

  User.deleteUser(user_id, function (response) {
    res.send({ result: response });
  });
};
exports.getList = function (req, res) {
  User.getList(function (response) {
    res.send({ result: response });
  });
};
