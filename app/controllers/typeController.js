import Type from '../models/type';
import fs from 'fs';
import logger from '../utils/logger';

export default {

  async getTypes(req, res) {
    try {
      logger.info('Get types');
      const types = await Type.find({});
      return res.status(200).json(types);
    }
    catch (err) {
      logger.error('Error: Get types', err);
      res.status(500).json(err);
    }
  },

  async getTypeById(req, res) {
    try {
      logger.info('Get type by id', req.params);
      const type = await Type.findOne({_id: req.params.id});
      if (!type) {
        return res.status(400).json('Type is not found');
      }

      return res.status(200).json(type);
    }
    catch (err) {
      logger.error('Error: Get type by id', err);
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

        logger.info('Add type', req.files, req.body);
        const result = await type.save();
        if (!result) {
          return res.status(400).json('Type is not found')
        }

        return res.status(200).json('Type is added');
      }
    }
    catch (err) {
      logger.error('Error: Add type', err);
      res.status(500).json(err);
    }
  },

  async updateTypeWithImage(req, res, next) {
    if (req.files.length === 1) {
      try {
        logger.info('Update type and image of it', req.body, req.params);
        removeImage(req.body.data.id);

        let type = await Type.findById(req.params.id);
        if (!type) {
          return res.status(400).json('Type is not found');
        }

        type.name_type = req.body.data.typename;
        type.image = req.files[0].filename;

        const result = type.save();
        if(!result) {
          return res.status(400).json('Type is not updated');
        }

        return res.status(200).json('Type is updated');
      }
      catch (err) {
        logger.info('Error: Update type and image of it', err);
        res.status(500).json(err);
      }
    } else {
      next();
    }
  },

  async updateTypeWithoutImage(req, res) {
    try {
      logger.info('Update only data of type', req.body);
      let type = await Type.findById(req.params.id);

      if (!type) {
        return res.status(400).json('Type is not found');
      }

      const arr = type.image.split('.');
      const index = arr.length - 1;
      const newName = req.body.data.typename + '.' + arr[index];
      fs.rename('uploads/' + type.image, 'uploads/' + newName);

      type.name_type = req.body.data.typename;
      type.image = newName;

      const result = await type.save();
      if (!result) {
        return res.status(400).json('type is not updated');
      }

      return res.status(200).json('type is updated');
    }
    catch (err) {
      logger.error('Error: Update only data of type', err);
      res.status(500).json(err);
    }
  },

  async removeType(req, res) {
    try {
      logger.info('Remove type', req.params);
      const type = await Type.findByIdAndRemove({_id: req.params.id});
      if (!type) {
        return res.status(400).json('type is not removed');
      }

      fs.unlink('uploads/' + type.image);
      return res.status(200).json('type is removed');
    }
    catch (err) {
      logger.info('Error: Remove type', err);
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
