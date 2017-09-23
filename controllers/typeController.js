import typeModel from '../models/type';
import fs from 'fs';

export default {

  getTypes(req, res) {
    typeModel.find({}, (err, types) => {
      if (err) res.send(err);
      res.send(types);
    });
  },

  getTypeById(req, res) {
    typeModel.findOne({_id: req.params.id}, (err, type) => {
      if (err) res.send(err);
      res.send(type);
    });
  },

  addType(req, res) {
    if (req.files) {
      const type = new typeModel({
        id_type: req.body.data.id,
        name_type: req.body.data.typename,
        image: req.files[0].filename
      });

      type.save((err, result) => {
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
        (err, result) => {
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
    typeModel.findById(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        var arr = result.image.split('.');
        var index = arr.length - 1;
        var newName = req.body.data.typename + '.' + arr[index];
        fs.rename('uploads/' + result.image, 'uploads/' + newName);
        result.name_type = req.body.data.typename;
        result.image = newName;
        result.save(err => {
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
    typeModel.findByIdAndRemove({_id: req.params.id}, (err, type) => {
      if (err) {
        res.send(err);
      } else {
        fs.unlink('uploads/' + type.image);
        res.json(type);
      }
    });
  },
}

function removeImage(id) {
  typeModel.findOne({id_type: id}, (err, result) => {
    if (!err) {
      fs.unlink('uploads/' + result.image);
    }
  });
}
