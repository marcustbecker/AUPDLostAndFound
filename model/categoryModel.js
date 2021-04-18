'use strict';
var sql = require('./db2');

//Category object constructor
var Category = function (category) {
    this.category_name = category.category_name;
};

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

Category.getAllCategories = function (result) {
    sql.query("Select * from category", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            //console.log('tasks : ', res);
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

module.exports = Category;


