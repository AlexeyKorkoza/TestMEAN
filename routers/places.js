var express = require('express');
var router = express.Router();
var placeModel = require('../../models/place');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
  placeModel.find({}, function (err, places) {
    if (err) {
      res.send(err)
    } else {
      res.json(places);
    }
  })
});

router.post('/add', function (req, res) {
  var place = new placeModel({
    name_place: req.body.name_place,
    description: req.body.description,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    id_type: req.body.id_type
  });
  place.save(function (err, places) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(places);
    }
  });
});

router.put('/edit/:id', function (req, res) {
  placeModel.findOneAndUpdate({"_id": req.body._id}, req.body, {runValidators: true}, function (err, places) {
    if (err) {
      res.send(err);
    } else {
      res.json(places);
    }
  });
});

router.delete('/:id', function (req, res) {
  placeModel.findByIdAndRemove({"_id": req.params.id}, function (err, type) {
    if (err) {
      res.send(err)
    } else {
      res.json(type)
    }
  })
});

module.exports = router;