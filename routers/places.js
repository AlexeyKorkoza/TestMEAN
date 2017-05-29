var express = require("express");
var router = express.Router();
var placeModel = require("../models/place");
var mongoose = require("mongoose");

router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.post("/", getPlacesByType);
router.post("/add", addPlace);
router.put("/:id", updatePlace);
router.delete("/:id", removePlace);

module.exports = router;

function getPlaces(req, res) {
  placeModel.find({}, function (err, places) {
    if (err) {
      res.send(err);
    } else {
      res.send(places);
    }
  });
}

function getPlaceById(req, res) {
  placeModel.findOne({_id: req.params.id}, function (err, place) {
    if (err) {
      res.send(err);
    } else {
      res.send(place);
    }
  });
}

function getPlacesByType(req, res) {
  placeModel.find({ id_type: req.body.id }, function(err, places) {
    if (err)
     res.send(err);
    res.json(places);
  });
}

function addPlace(req, res) {
  var place = new placeModel({
    name_place: req.body.name_place,
    description: req.body.description,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    name_type: req.body.name_type
  });
  place.save(function (err, places) {
    if (err) {
      res.send(err);
    } else {
      res.send(places);
    }
  });
}

function updatePlace(req, res) {
  placeModel.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {runValidators: true},
    function (err, places) {
      if (err) {
        res.send(err);
      } else {
        res.send(places);
      }
    }
  );
}

function removePlace(req, res) {
  placeModel.findByIdAndRemove({_id: req.params.id}, function (err, place) {
    if (err) {
      res.send(err);
    } else {
      res.send(place);
    }
  });
}
