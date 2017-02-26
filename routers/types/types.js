var express = require('express');
var router = express.Router();
var typeModel = require('../../models/type');
var mongoose = require('mongoose');


/*var upload = multer({
  storage: storage
}).single('file');*/

router.get('/', function (req, res) {
  typeModel.find({}, function (err, types) {
    if (err)
      res.send(err);
    res.send(types);
  })
});

function add(req, res) {
    var type = new typeModel({
      id_type: req.body.id,
      name_type: req.body.typename,
      marker_img: req.body.typename
    });
    type.save(function (err) {
      if(err){
        res.send(err);
      } else {
        res.send("Good");
      }
    });
}

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
module.exports = {
  add: add
};
