"use strict";
const Item = require("../model/itemModel");
const Category = require("../model/categoryModel");
const Location = require("../model/locationModel");

exports.list_all_items = function (req, res) {
  let user = req.session.user;
  Item.getAllItems(function (err, items) {
    if (err) res.send(err);
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("items", {
        title: "Lost and Found Items",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.list_all_claimed_items = function (req, res) {
  let user = req.session.user;
  Item.getClaimedItems(function (err, items) {
    if (err) res.send(err);
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("reportsClaimed", {
        title: "Claimed Items Report",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.list_all_unclaimed_items = function (req, res) {
  let user = req.session.user;
  Item.getUnclaimedItems(function (err, items) {
    if (err) res.send(err);
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("items", {
        title: "ItemsUser",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.list_item_description = function (req, res) {
  Item.getItemById(req.params.itemId, function (err, items) {
    if (err) res.send(err);
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("itemsDescription", {
        title: "ItemDetails",
        Data: items,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.claim_item = function (req, res) {
  let user = req.session.user.user_id;
  Item.claimItem(req.params.itemId, user, function (err, item) {
    if (err) res.send(err);
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("claimedItem", {
        title: "Test application",
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.create_an_item_form = function (req, res) {
  let user = req.session.user;
  Category.getAllCategories(function (err, categories) {
    Location.getAllLocations(function (err, locations) {
      if (user == null) {
        res.render("home", { session: "Session Expired!" });
      } else {
        res.render("createItem", {
          title: "Create Item Page",
          Categories: categories,
          Locations: locations,
          LoggedIn: user.loggedIn,
          Admin: user.admin,
          UserID: user.user_id,
        });
      }
    });
  });
};

exports.create_an_item = function (req, res) {
  var new_item = new Item(req.body);
  if (new_item.approx_value === "") {
    new_item.approx_value = null;
  }
  if (!new_item.item_name || !new_item.item_description) {
    res
      .status(400)
      .send({ error: true, message: "Please provide name/description" });
  } else {
    Item.createItem(new_item, function (err, item) {
      if (err) res.send(err);
      res.redirect("/items");
    });
  }
};

exports.update_an_item = function (req, res) {
  var updated_item = new Item(req.body);
  var updatedItem = req.params;
  Item.updateById(updatedItem, function (err, item) {
    if (err) res.send(err);
    res.render("/itemEdit");
  });
};

exports.delete_an_item = function (req, res) {
  let user = req.session.user;
  const id = req.params.itemId;
  Item.remove(id, function (err, category) {
    if (err) res.send(err);
    const deleting = "Item";
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("deleted", {
        title: "Item Delete",
        DelName: deleting,
        ID: id,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};
