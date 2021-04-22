'use strict';
var Item = require('../model/itemModel');
const categoryCtrl = require('../model/categoryModel')

exports.list_all_items = function (req, res) {
    //console.log("LIST ALL ITEMS");
    Item.getAllItems(function (err, items) {
        //console.log('item controller')
        if (err) res.send(err);

        //console.log('res', items);
        //res.json(items);
        res.render('items', {title:"Lost and Found Items", Data: items});
        
    });
};

exports.list_all_claimed_items = function (req, res) {
    Item.getClaimedItems(function (err, items) {
        if (err) res.send(err);
        //res.json(items);
        res.render('reportsClaimed', {title:"Claimed Items Report", Data: items});
    });
};

exports.list_all_unclaimed_items = function (req, res) {
    Item.getUnclaimedItems(function (err, items) {
        if (err) res.send(err);
        //res.json(items);
        res.render('itemsUser', {title:"ItemsUser", Data: items});
    });
};

exports.list_item_description = function (req, res) {
    Item.getItemById(req.params.itemId, function(err, items) {
        if (err) res.send(err);
        //res.json(items);
        res.render('itemsDescription', {title:"ItemDetails", Data: items});
    });
}

exports.claim_item = function (req, res) {
    Item.claimItem(req.params.itemId, function (err, item) {
        if (err) res.send(err);
        //res.json({message: 'Task successfully deleted'});
        
        res.render('test', {title:"Test application"});
    });
}

/*
exports.create_a_task = function (req, res) {
    console.log("POST CREATE");
    var new_task = new Task(req.body);
    console.log( new_task );
    //handles null error
    if (!new_task.task || !new_task.status) {
        res.status(400).send({error: true, message: 'Please provide task/status'});
    } else {
        Task.createTask(new_task, function (err, task) {
            if (err) res.send(err);
            res.json(task);
        });
    }
};
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