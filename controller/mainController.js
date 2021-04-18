'use strict';
const Task = require('../model/taskModel.js');

exports.getHomePage = function (req, res) {
    res.render('index', {title:"My application"});
};

exports.getTasks = function (req, res) {
    Task.getAllTask(function (err, task) {
        //console.log('controller')
        if (err) res.send(err);
        //console.log('res', task[0]);
        //res.send(task);
        res.render('index', {title:"Test application", Tasks: task});
    });
};

exports.delete_a_task = function (req, res) {
    console.log(req.params.taskId)
    const id = req.params.taskId
    //res.render('test', {title:"Test application", Tasks: task});
    Task.remove(req.params.taskId, function (err, task) {
        if (err) res.send(err);
        //res.json({message: 'Task successfully deleted'});
        res.render('test', {title:"Test application", Tasks: id});
    });

};

exports.createForm = function (req, res){
    res.render('createTask')
};

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
            //res.json(task);
            res.redirect('/')
        });
    }
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