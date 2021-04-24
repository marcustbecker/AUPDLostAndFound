"use strict";
var sql = require("./db");

//Category object constructor
var Location = function (location) {
  this.location_name = location.location_name;
  this.floor = location.floor;
};

Location.createLocation = function (newLocation, result) {
  sql.query("INSERT INTO location set ?", newLocation, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      //console.log("res in taskModel.js: ", res);
      //console.log("taskModel.js res.insertID: ", res.insertId); insertID is the id of the new object created
      result(null, res.insertId);
    }
  });
};

Location.getAllLocations = function (result) {
    sql.query("Select * from location ORDER BY location_name ASC, floor", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            //console.log('location : ', res);
            result(null, res);
        }
    });
};

Location.getLocationById = function (id, result) {
    const sqStr = "SELECT * FROM location WHERE location_id = ? "

    sql.query(sqStr, id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            //console.log('location : ', res);
            result(null, res);
        }
    });
};
/*
Category.updateById = function (id, task, result) {
    sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Location.remove = function (id, result) {
  sql.query(
    "DELETE FROM location WHERE location_id = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Location;
