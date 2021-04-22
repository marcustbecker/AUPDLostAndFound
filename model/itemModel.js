"use strict";
var sql = require("./db2");

//Category object constructor
var Item = function (item) {
  this.item_name = item.item_name;
  this.item_id = item.item_id;
  //this.user_id = item.user_id;
  //this.user_name = item.user_name;
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
  const sqStr =
    "SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found, DATE_FORMAT(date_claimed, '%m/%d/%Y') AS date_claimed FROM item" +
    " INNER JOIN category ON item.category = category.category_id" +
    " JOIN `location` ON `item`.`location_found` = `location`.`location_id`" +
    " JOIN user on found_user_id = user.user_id";

  //const sqStr2 = "SELECT * FROM `item` JOIN `location` ON `item`.`location_found` = `location`.`location_id`"
  sql.query(sqStr, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("item : ", res);
      result(null, res);
    }
  });
};

Item.getClaimedItems = function (result) {
  const sqStr =
    "SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found, DATE_FORMAT(date_claimed, '%m/%d/%Y') AS date_claimed FROM item" +
    " INNER JOIN user ON item.found_user_id = user.user_id WHERE claimed_user_id IS NOT NULL";

  sql.query(sqStr, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Item.getUnclaimedItems = function (result) {
  const sqStr =
    "SELECT * FROM item" +
    " INNER JOIN category ON item.category = category.category_id" +
    " JOIN location ON item.location_found = location.location_id" +
    " WHERE date_claimed IS NULL";

  sql.query(sqStr, function (err, res) {
    if (err) {
      console.log("error: ", err);
      console.log("item : ", res);
      result(err, null);
    } else {
      console.log("item : ", res);
      result(null, res);
    }
  });
};

Item.getItemById = function (id, result) {
  const sqStr =
    "SELECT *, DATE_FORMAT(date_found, '%m/%d/%Y') AS date_found FROM item" +
    " INNER JOIN category ON item.category = category.category_id" +
    " INNER JOIN location ON item.location_found = location.location_id" +
    " WHERE item.item_id = ?";
  console.log("inside getItemById");
  sql.query(sqStr, [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      console.log("item : ", res);
      result(err, null);
    } else {
      console.log("Inside GetItemByID : ", res);
      result(null, res);
    }
  });
};

Item.claimItem = function (idItem, idUser, result) {
  const sqStr =
    "UPDATE item SET date_claimed = CURRENT_TIMESTAMP, claimed_user_id = ? WHERE item_id = ?";
  sql.query(sqStr, [idUser, idItem], function (err, res) {
    if (err) {
      console.log("error: ", err);
      console.log("item : ", res);
      result(err, null);
    } else {
      console.log("Inside GetItemByID : ", res);
      result(null, res);
    }
  });
};

Item.createItem = function (newItem, result) {
  const item = {
    item_name: newItem.item_name,
    item_description: newItem.item_description,
    approx_value: newItem.approx_value,
    found_user_id: newItem.found_user_id,
    claimed_user_id: newItem.claimed_user_id,
    date_found: newItem.date_found,
    date_claimed: newItem.date_claimed,
    location_found: newItem.location_found,
    location_description: newItem.location_description,
    location_room: newItem.location_room,
    category: newItem.category
  }
  
  sql.query("INSERT INTO item set ?", item, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Item.updateById = function (item, result) {
  sql.query("UPDATE item SET ?", item, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Item.remove = function (id, result) {
  sql.query("DELETE FROM item WHERE item_id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Item;
