import typeModel from "../models/type";
import multer from "multer";
import fs from "fs";

export default {

  getTypes(req, res) {
    typeModel.find({}, function (err, types) {
      if (err) res.send(err);
      res.send(types);
    });
  },

  getTypeById(req, res) {
    typeModel.findOne({_id: req.params.id}, function (err, type) {
      if (err) res.send(err);
      res.send(type);
    });
  },

  addType(req, res) {
    if (req.files) {
      var type = new typeModel({
        id_type: req.body.data.id,
        name_type: req.body.data.typename,
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
  },

  updateTypeWithImage(req, res, next) {
    if (req.files.length === 1) {
      removeImage(req.body.data.id);
      typeModel.findOneAndUpdate(
        {_id: req.params.id},
        {
          name_type: req.body.data.typename,
          image: req.files[0].filename
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      next();
    }
  },

  updateTypeWithoutImage(req, res) {
    typeModel.findById(req.params.id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        var arr = result.image.split(".");
        var index = arr.length - 1;
        var newName = req.body.data.typename + "." + arr[index];
        fs.rename("uploads/" + result.image, "uploads/" + newName);
        result.name_type = req.body.data.typename;
        result.image = newName;
        result.save(function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
    });
  },

  removeType(req, res) {
    typeModel.findByIdAndRemove({_id: req.params.id}, function (err, type) {
      if (err) {
        res.send(err);
      } else {
        fs.unlink("uploads/" + type.image);
        res.json(type);
      }
    });
  },
}

function removeImage(id) {
  typeModel.findOne({id_type: id}, function (err, result) {
    if (!err) {
      fs.unlink("uploads/" + result.image);
    }
  });
}
