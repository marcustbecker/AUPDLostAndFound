const express = require('express');
const app = express.Router();
const itemCtrl = require('../controller/itemController')

// Get the index page
app.route('/items')
    .get(itemCtrl.list_all_items)

app.route('/createItem')
    .get(itemCtrl.create_an_item_form)

app.route('/claimeditems')
    .get(itemCtrl.list_all_claimed_items)

app.route('/unclaimeditems')
    .get(itemCtrl.list_all_unclaimed_items)

app.route('/claimeditems')
    .get(itemCtrl.list_all_claimed_items)

module.exports = app;