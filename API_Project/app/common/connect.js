const mysql = require("mysql");

const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "",
  database: "project_map4d",
});

connection.connect(function (err) {
  if (err) {
    console.log("Kết nối CSDL khong thành công");
  }
});

module.exports = connection;
