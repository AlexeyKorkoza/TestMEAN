var express = require('express');
var router = express.Router();
var typeModel = require('../models/type');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.' + file.mimetype.split('/')[1]);
  }
});

var upload = multer({storage: storage});

router.get('/', function (req, res) {
  typeModel.find({}, function (err, types) {
    if (err)
      res.send(err);
    res.send(types);
  })
});

router.post('/add', upload.any(), function (req, res) {

  if (req.files) {
    var type = new typeModel({
      id_type: req.body.data.id,
      name_type: req.body.data.typename,
      marker_img: req.body.data.typename,
      image: req.files[0].filename
    });

    type.save(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

router.put('/:id', upload.any(), function (req, res, next) {
  if (req.files.length === 1) {
    typeModel.findOneAndUpdate({"id_type": req.body.data.id}, {
      "name_type": req.body.data.typename,
      "marker_img": req.body.data.typename,
      "image": req.files[0].filename
    }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    next();
  }
});

router.put('/:id', function (req, res) {
  console.log(req.body);
  console.log(req.body.data);
  console.log(req.data);
  typeModel.findOneAndUpdate({"id_type": req.body.data.id}, {
    "name_type": req.body.data.typename,
    "marker_img": req.body.data.typename
  }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.delete('/:id', function (req, res) {
  typeModel.findByIdAndRemove({"_id": req.params.id}, function (err, type) {
    if (err) {
      res.send(err)
    } else {
      fs.unlink("uploads/" + type.image);
      res.json(type);
    }
  })
});

module.exports = router;