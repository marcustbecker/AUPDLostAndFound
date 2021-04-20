const express = require('express');
const app = express.Router();
const itemCtrl = require('../controller/itemController')

// Get the index page
app.route('/items')
    .get(itemCtrl.list_all_items)

module.exports = app;