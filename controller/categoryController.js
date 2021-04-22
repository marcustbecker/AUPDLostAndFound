"use strict";
const Category = require("../model/categoryModel");

exports.getHomePage = function (req, res) {
  let user = req.session.user;
  res.render("index", { title: "My application" });
};

exports.getCategories = function (req, res) {
  let user = req.session.user;
  if (user.admin) {
    Category.getAllCategories(function (err, categories) {
      //console.log('controller')
      if (err) res.send(err);
      //console.log('res', categories[0]);
      //res.send(categories);
      res.render("categories", {
        title: "Test application",
        Data: categories,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    });
  } else {
    res.render("home", { title: "AUPD Lost and Found" });
  }
};

exports.create_a_category = function (req, res) {
  let user = req.session.user;
  console.log("POST CREATE req.body: ", req.body);
  var new_category = new Category(req.body);
  console.log("New_category: ", new_category);
  //handles null error
  if (!new_category.category_name) {
    res.status(400).send({ error: true, message: "Please provide name" });
  } else {
    Category.createCategory(new_category, function (err, category) {
      if (err) res.send(err);
      //res.json(category);
      res.redirect("/categories");
    });
  }
};

exports.delete_a_category = function (req, res) {
  let user = req.session.user;
  //console.log(req.params.catId)
  const id = req.params.catId;
  Category.remove(id, function (err, category) {
    if (err) res.send(err);
    const deleting = "Category";
    res.render("deleted", {
      title: "Category Delete",
      DelName: deleting,
      ID: id,
      LoggedIn: req.session.user.loggedIn,
      Admin: req.session.user.admin,
    });
  });
};

exports.find_a_category = function (req, res) {
  let user = req.session.user;
  Category.getCategoryById(req.params.catId, function (err, category) {
    if (err) res.send(err);
    res.json(category);
    //res.redirect('/categories')
  });
};

