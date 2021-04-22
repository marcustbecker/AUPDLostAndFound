"use strict";
var Location = require("../model/locationModel");

exports.list_all_locations = function (req, res) {
  let user = req.session.user;
  Location.getAllLocations(function (err, locations) {
    //console.log("location controller");
    if (err) res.send(err);
    //console.log("res", locations);
    //res.send(location);
    res.render("locations", {
      title: "AU Locations",
      Data: locations,
      LoggedIn: req.session.user.loggedIn,
      Admin: req.session.user.admin,
    });
  });
};

exports.create_location = function (req, res) {
  let user = req.session.user;
  var new_location = new Location(req.body);
  //if non-required fields are blank, set them to null
  if (new_location.room === "") {
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
      res.redirect("/locations");
    });
  }
};

exports.delete_a_location = function (req, res) {
  let user = req.session.user;
  const id = req.params.locatId;
  Location.remove(id, function (err, location) {
    if (err) res.send(err);
    //res.json({ message: "Location successfully deleted" });
    const deleting = "Location";
    res.render("deleted", {
      title: "Location Delete",
      DelName: deleting,
      ID: id,
      LoggedIn: req.session.user.loggedIn,
      Admin: req.session.user.admin,
    });
  });
};
