"use strict";
var mysql = require("mysql");
//local mysql db connection
var connection = mysql.createConnection({
  host: "45.55.136.114",
  user: "MNDs2021",
  password: "baseba11is0K!",
  database: "MNDs2021",
});
connection.connect(function (err) {
  if (err) throw err;
});
module.exports = connection;
