'use strict';
var Item = require('../model/itemModel');
const categoryCtrl = require('../model/categoryModel')

exports.list_all_items = function (req, res) {
    //console.log("LIST ALL ITEMS");
    Item.getAllItems(function (err, items) {
        //console.log('item controller')
        if (err) res.send(err);

        for(let i=0; i<items.length; i++){
            
            categoryCtrl.getOneCategory(items[i].category, function(result){
                if(result){
                    //console.log("byid res: ", result)
                    //console.log("cat name: ", result.category_name)
                    items[i].category = result.category_name
                    console.log("Items after Change: ", items);
                }
            })
        }

        console.log("The New Items:", items);
        res.render('items', {title:"Lost and Found Items", Data: items});
        
        //console.log('res', items);
        //res.send(task);
        
    });
};

function myFunction() {
    console.log("Here")
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