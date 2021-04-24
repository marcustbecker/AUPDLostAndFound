"use strict";
const Category = require("../model/categoryModel");

exports.getCategories = function (req, res) {
  let user = req.session.user;
  //if (user.admin) {
  Category.getAllCategories(function (err, categories) {
    if (err) res.send(err);
    //res.send(categories); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("categories", {
        title: "Test application",
        Data: categories,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.create_a_category = function (req, res) {
  var new_category = new Category(req.body);
  if (!new_category.category_name) {
    res.status(400).send({ error: true, message: "Please provide name" });
  } else {
    Category.createCategory(new_category, function (err, category) {
      if (err) res.send(err);
      //res.send(new_category); // <-------FOR TESTING
      res.redirect("/categories");
    });
  }
};

exports.delete_a_category = function (req, res) {
  let user = req.session.user;
  const id = req.params.catId;
  Category.remove(id, function (err, category) {
    if (err) res.send(err);
    const deleting = "Category";
    //res.send("deleted:" + category); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("deleted", {
        title: "Category Delete",
        DelName: deleting,
        ID: id,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};
