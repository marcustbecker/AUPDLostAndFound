"use strict";
var Location = require("../model/locationModel");

exports.list_all_locations = function (req, res) {
  let user = req.session.user;
  Location.getAllLocations(function (err, locations) {
    if (err) res.send(err);
    //res.send(locations); // <-------FOR TESTING
    if (user == null) {
      res.render("home", { session: "Session Expired!" });
    } else {
      res.render("locations", {
        title: "AU Locations",
        Data: locations,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};

exports.create_location = function (req, res) {
  var new_location = new Location(req.body);
  if (new_location.room === "") {
    new_location.room = null;
  }
  if (!new_location.location_name) {
    res.status(400).send({
      error: true,
      message: "Please provide location name",
    });
  } else {
    Location.createLocation(new_location, function (err, location) {
      if (err) res.send(err);
      //res.send(new_location); // <-------FOR TESTING
      res.redirect("/locations");
    });
  }
};

exports.delete_a_location = function (req, res) {
  let user = req.session.user;
  const id = req.params.locatId;
  Location.remove(id, function (err, location) {
    if (err) res.send(err);
    //res.send("deleted location id: " + id); // <-------FOR TESTING
    if (user == null) {
      res.render("home");
    } else {
      res.render("deleted", {
        title: "Location Delete",
        DelName: "Location",
        ID: id,
        LoggedIn: req.session.user.loggedIn,
        Admin: req.session.user.admin,
      });
    }
  });
};
