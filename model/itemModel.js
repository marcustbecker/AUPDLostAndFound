'use strict';
var sql = require('./db2');

//Category object constructor
var Item = function (item) {
    this.item_name = item.item_name;
    this.item_id = item.item_id;
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
    const sqStr = "SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found, DATE_FORMAT(date_claimed, '%m/%d/%Y') AS date_claimed FROM item"
    + " INNER JOIN category ON item.category = category.category_id"
    + " JOIN `location` ON `item`.`location_found` = `location`.`location_id`"

    //const sqStr2 = "SELECT * FROM `item` JOIN `location` ON `item`.`location_found` = `location`.`location_id`"
    sql.query(sqStr , function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('item : ', res);
            result(null, res);
        }
    });
};

Item.getClaimedItems = function (result) {
    const sqStr = "SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found, DATE_FORMAT(date_claimed, '%m/%d/%Y') AS date_claimed FROM item"
        + " INNER JOIN user ON item.found_user_id = user.user_id WHERE claimed_user_id IS NOT NULL"

    sql.query( sqStr, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Item.getUnclaimedItems = function (result) {

    const sqStr = "SELECT * FROM item"
    + " INNER JOIN category ON item.category = category.category_id"
    + " JOIN location ON item.location_found = location.location_id"
    + " WHERE date_claimed IS NULL"

    sql.query(sqStr, function (err, res) {
        if (err) {
            console.log("error: ", err);
            console.log('item : ', res);
            result(err, null);
        } else {
            console.log('item : ', res);
            result(null, res);
        }
    });
};

Item.getItemById = function (id, result) {
    const sqStr = "SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found FROM item"
    + " INNER JOIN category ON item.category = category.category_id"
    + " INNER JOIN location ON item.location_found = location.location_id"
    + " WHERE item.item_id = ?"
    console.log("inside getItemById");
    sql.query(sqStr, [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            console.log('item : ', res);
            result(err, null);
        } else {
            console.log('Inside GetItemByID : ', res);
            result(null, res);
        }
    });
}

Item.claimItem = function(id, result) {
    const sqStr = "UPDATE item SET date_claimed = CURRENT_TIMESTAMP WHERE item_id = ?"
    sql.query(sqStr, [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            console.log('item : ', res);
            result(err, null);
        } else {
            console.log('Inside GetItemByID : ', res);
            result(null, res);
        }
    });
    
}
/*
Category.createCategory = function (newCat, result) {
    sql.query("INSERT INTO category set ?", newCat, function (err, res) {

Item.createItem = function (newCat, result) {
    sql.query("INSERT INTO item set ?", newCat, function (err, res) {
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


