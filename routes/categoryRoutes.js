const express = require('express');
const app = express.Router();
const categoryCtrl = require('../controller/categoryController');

// Get the index page
app.route('/categories')
    .get(categoryCtrl.getCategories)
    .post(categoryCtrl.create_a_category);

app.route('/category/:catId')
    .get(categoryCtrl.find_a_category)
    .delete(categoryCtrl.delete_a_category);

module.exports = app;