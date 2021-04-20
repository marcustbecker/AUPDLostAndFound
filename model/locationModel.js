'use strict';
var sql = require('./db2');

//Category object constructor
var Location = function (location) {
    this.location_name = location.location_name;
    this.floor = location.floor;
    this.room = location.room;
    this.description = location.description;
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

/*
Category.getTaskById = function (taskId, result) {
    sql.query("Select id, task, status, created_at from tasks where id = ? ", taskId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}; */


Location.getAllLocations = function (result) {
    sql.query("Select * from location", function (err, res) {
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
*/

Location.remove = function (id, result) {
    sql.query("DELETE FROM location WHERE location_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Location;


