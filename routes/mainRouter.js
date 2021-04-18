const express = require('express');
const app = express.Router();
const mainCtrl = require('../controller/mainController');

// Get the index page
app.route('/')
    .get(mainCtrl.getTasks)

app.route('/create')
    .get(mainCtrl.createForm)
    .post(mainCtrl.create_a_task);

app.route('/tasks/:taskId')
    .delete(mainCtrl.delete_a_task);

module.exports = app;