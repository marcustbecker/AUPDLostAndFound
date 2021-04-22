const express = require('express');
const app = express.Router();
const itemCtrl = require('../controller/itemController')

// Get the index page
app.route('/items')
    .get(itemCtrl.list_all_items)

app.route('/claimeditems')
    .get(itemCtrl.list_all_claimed_items)

app.route('/unclaimed')
    .get(itemCtrl.list_all_unclaimed_items)

app.route('/lostItemsUser')
    .get(itemCtrl.list_all_unclaimed_items)

app.route('/lostItemsUser/:itemId')
    .get(itemCtrl.list_item_description)
    .post(itemCtrl.claim_item)
module.exports = app;