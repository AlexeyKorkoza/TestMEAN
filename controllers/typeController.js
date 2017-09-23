import Type from '../models/type';
import fs from 'fs';

export default {

  async getTypes(req, res) {
    try {
      const types = await Type.find({});
      if (types.length) {
        res.status(200).json(types);
      }

      res.status(400).json('Types are not found');
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async getTypeById(req, res) {
    try {
      const type = await Type.findOne({_id: req.params.id});
      if (!type) {
        res.status(400).json('Type is not found');
      }

      res.status(200).json(type);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async addType(req, res) {
    try {
      if (req.files) {
        const type = new Type({
          id_type: req.body.data.id,
          name_type: req.body.data.typename,
          image: req.files[0].filename
        });

        const result = await type.save();
        if (!result) {
          res.status(400).json('Type is not found')
        }

        res.status(200).json('Type is added');
      }
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async updateTypeWithImage(req, res, next) {
    if (req.files.length === 1) {
      try {
        removeImage(req.body.data.id);
        const type = new Type({
          'name_type': req.body.data.typename,
          'image': req.files[0].filename
        });

        const result = await Type.findOneAndUpdate({_id: req.params.id}, type);
        if (result) {
          res.status(200).json('Type is updated');
        }

        res.status(400).json('Type is not found');
      }
      catch (err) {
        res.status(500).json(err);
      }
    } else {
      next();
    }
  },

  async updateTypeWithoutImage(req, res) {
    try {
      const type = await Type.findById(req.params.id);

      const arr = type.image.split('.');
      const index = arr.length - 1;
      const newName = req.body.data.typename + '.' + arr[index];
      fs.rename('uploads/' + result.image, 'uploads/' + newName);

      const updateType = new Type({
        'name_type': req.body.data.typename,
        'image': newName
      });

      const result = await updateType.save();
      if (!result) {
        res.status(400).json('Type is not updated');
      }

      res.status(200).json('Type is updated');
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async removeType(req, res) {
    try {
      const type = await Type.findByIdAndRemove({_id: req.params.id});
      if (!type) {
        res.status(400).json('Type is not removed');
      }

      fs.unlink('uploads/' + type.image);
      res.status(200).json('Type is removed');
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
}

async function removeImage(id) {
  const type = await Type.findOne({id_type: id});
  if (type) {
    fs.unlink('uploads/' + result.image);
  }
}
