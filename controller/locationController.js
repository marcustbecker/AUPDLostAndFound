"use strict";
var Location = require("../model/locationModel");


exports.list_all_locations = function (req, res) {
  Location.getAllLocations(function (err, locations) {
    //console.log("location controller");
    if (err) res.send(err);
    //console.log("res", locations);
    //res.send(location);
    res.render('locations', {title:"AU Locations", Data: locations});
  });
};

exports.create_location = function (req, res) {
  var new_location = new Location(req.body);
  //if non-required fields are blank, set them to null
  if(new_location.room === ""){
    new_location.room = null;
  }
  //console.log("New location data: ", new_location)
  //handles null error
  if (!new_location.location_name) {
    res.status(400).send({
      error: true,
      message: "Please provide location name",
    });
  } else {
    Location.createLocation(new_location, function (err, location) {
      if (err) res.send(err);
      //res.json(location);
      res.redirect('/locations')
    });
  }
};

/*
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
exports.delete_a_location = function (req, res) {
  const id = req.params.locatId
  Location.remove(id, function (err, location) {
    if (err) res.send(err);
    //res.json({ message: "Location successfully deleted" });
    const deleting = "Location"
    res.render('test', {title:"Test application", DelName: deleting, ID: id});
  });
};
