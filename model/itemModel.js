'use strict';
var sql = require('./db2');

//Category object constructor
var Item = function (item) {
    this.item_name = item.item_name;
    this.item_description = item.item_description;
    this.approx_value = item.approx_value;
    this.found_user_id = item.found_user_id;
    this.claimed_user_id = item.claimed_user_id;
    this.date_found = item.date_found;
    this.date_claimed = item.date_claimed;
    this.location_found = item.location_found;
    this.category = item.category;
};

Item.getAllItems = function (result) {
    sql.query("SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found from item", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            //console.log('item : ', res);
            result(null, res);
        }
    });
};
/*
Category.createCategory = function (newCat, result) {
    sql.query("INSERT INTO category set ?", newCat, function (err, res) {
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

Category.remove = function (id, result) {
    sql.query("DELETE FROM category WHERE category_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Category.getTaskById = function (taskId, result) {
    sql.query("Select id, task, status, created_at from tasks where id = ? ", taskId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

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
module.exports = Item;


