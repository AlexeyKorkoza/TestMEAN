var express = require('express');
var router = express.Router();
var placeModel = require('../models/place');
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
  placeModel.create({
      name_place: req.body.name_place,
      description: req.body.description,
      coordinateX: req.body.coordinateX,
      coordinateY: req.body.coordinateY,
      address: req.body.address,
      id_type: req.body.id_type
    }, function (err, place) {
      if (err)
        res.send(err);
      res.json(place);
    }
  );
});

router.put('/edit/:id', function (req, res) {
  placeModel.findOneAndUpdate({"_id": req.body._id}, {
    "name_place": req.body.name_place,
    "description": req.body.description,
    "coordinateX": req.body.coordinateX,
    "coordinateY": req.body.coordinateY,
    "address": req.body.address,
    "id_type": req.body.id_type
  }, function (err, places) {
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