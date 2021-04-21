'use strict';
const Task = require('../model/taskModel.js');
const Category = require('../model/categoryModel')

exports.getHomePage = function (req, res) {
    res.render('index', {title:"My application"});
};

exports.getCategories = function (req, res) {
    Category.getAllCategories(function (err, categories) {
        //console.log('controller')
        if (err) res.send(err);
        //console.log('res', categories[0]);
        //res.send(categories);
        res.render('categories', {title:"Test application", Data: categories});
    });
};

exports.delete_a_category = function (req, res) {
    //console.log(req.params.catId)
    const id = req.params.catId
    Category.remove(id, function (err, category) {
        if (err) res.send(err);
        //res.json({message: 'Task successfully deleted'});
        const deleting = "Category"
        res.render('test', {title:"Test application", DelName: deleting, ID: id});
    });
};

exports.create_a_category = function (req, res) {
    console.log("POST CREATE req.body: ", req.body);
    var new_category = new Category(req.body);
    console.log("New_category: ", new_category );
    //handles null error
    if (!new_category.category_name) {
        res.status(400).send({error: true, message: 'Please provide name'});
    } else {
        Category.createCategory(new_category, function (err, category) {
            if (err) res.send(err);
            //res.json(category);
            res.redirect('/categories')
        });
    }
};
exports.find_a_category = function (req, res) {
    Category.getCategoryById(req.params.catId, function (err, category) {
        if (err) res.send(err);
        res.json(category);
        //res.redirect('/categories')
    });
};
exports.update_a_task = function (req, res) {
    Task.updateById(req.params.taskId, new Task(req.body), function (err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};