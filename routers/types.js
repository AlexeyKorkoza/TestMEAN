var express = require('express');
var router = express.Router();
var typeModel = require('../models/type');
var multer = require('multer');
var mongoose = require('mongoose');

router.get('/', function (req, res) {
  typeModel.find({}, function (err, types) {
    if (err)
      res.send(err);
    res.send(types);
  })
});

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    typeModel.create({
      id_type: req.body.id_type,
      name_type: req.body.typename,
      marker_img: req.body.typename
    }, function (err) {
      if (err) {
        console.log(err);
      }
    });
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

router.put('/edit/:id', function (req, res) {
  upload(req, res, function (err) {
    typeModel.findOneAndUpdate({"id_type": req.body.id_type}, {
      "name_type": req.body.typename,
      "marker_img": req.body.typename
    }, function (err) {
      if (err) {
        console.log(err);
      }
    });
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

router.delete('/:id', function (req, res) {
  typeModel.findByIdAndRemove({"_id": req.params.id}, function (err, type) {
    if (err) {
      res.send(err)
    } else {
      res.json(type)
    }
  })
});

module.exports = router;
