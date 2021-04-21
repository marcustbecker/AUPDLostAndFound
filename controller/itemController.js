'use strict';
const Item = require('../model/itemModel');
const Category = require('../model/categoryModel');
const Location = require('../model/locationModel')

exports.list_all_items = function (req, res) {
    let user = req.session.user;
    let loggedIn = req.session.loggedIn;
    console.log("User: ", user);
    console.log("Logged In: ", loggedIn);
    //console.log("LIST ALL ITEMS");
    Item.getAllItems(function (err, items) {
        //console.log('item controller')
        if (err) res.send(err);

        //console.log('res', items);
        //res.json(items);
        res.render('items', {title:"Lost and Found Items", Data: items, LoggedIn: loggedIn});
        
    });
};

exports.list_all_claimed_items = function (req, res) {
    let loggedIn = req.session.loggedIn;
    Item.getClaimedItems(function (err, items) {
        if (err) res.send(err);
        //res.json(items);
        res.render('reportsClaimed', {title:"Claimed Items Report", Data: items, LoggedIn: loggedIn});
    });
};

exports.list_all_unclaimed_items = function (req, res) {
    let loggedIn = req.session.loggedIn;
    Item.getUnclaimedItems(function (err, items) {
        if (err) res.send(err);
        //res.json(items);
        res.render('reportsUnclaimed', {title:"Unclaimed Items Report", Data: items, LoggedIn: loggedIn});
    });
};

exports.create_an_item_form = function (req, res) {
    let loggedIn = req.session.loggedIn;
    Category.getAllCategories(function (err, categories){
        Location.getAllLocations(function (err, locations){
            res.render('createItem', {title: "Create Item Page", Categories: categories, Locations: locations, LoggedIn: loggedIn})
        })
    })
};

exports.create_an_item = function (req, res) {
    //console.log("POST CREATE");
    var new_item = new Item(req.body);
    //console.log( new_item );
    //handles null error
    if (!new_item.item_name || !new_item.item_description) {
        res.status(400).send({error: true, message: 'Please provide name/description'});
    } else {
        Item.createItem(new_item, function (err, item) {
            if (err) res.send(err);
            //res.json(item);
            res.redirect('/items')
        });
    }
};
/*
exports.delete_a_task = function (req, res) {
    Task.remove(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};
exports.read_a_task = function (req, res) {
    Task.getTaskById(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};
exports.update_a_task = function (req, res) {
    Task.updateById(req.params.taskId, new Task(req.body), function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};
*/