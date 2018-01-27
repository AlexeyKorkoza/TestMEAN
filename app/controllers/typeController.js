import Type from '../models/type';
import User from '../models/user';
import fs from 'fs';
import logger from '../utils/logger';

export default {

    /**
     * @request GET /api/v1/types
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async getTypes(req, res) {
    try {
      logger.info('Get types');
      const { _id } = req.session.user;
      const attributes = {
        'password': 0,
        'username': 0,
        'date': 0,
        'email': 0,
        'places': 0
      };
      const types = await User.findById(_id).select(attributes).populate('types');
      return res.status(200).json(types.types);
    }
    catch (err) {
      logger.error('Error: Get types', err);
      res.status(500).json(err);
    }
  },

    /**
     * @request GET /api/v1/types/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
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

    /**
     * @request POST /api/v1/types
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async addType(req, res) {
    try {
      if (req.files) {
        const type = new Type({
          name: req.body.data.name,
          image: req.files[0].filename
        });

        logger.info('Add type', req.files, req.body);
        let result = await type.save();
        if (!result) {
          return res.status(400).json('Type is not added')
        }

        const { _id } = req.session.user;
        result = await User.findByIdAndUpdate(_id, {$push: {types: result._id}}, {new: true});
        if (!result) {
          return res.status(400).json('Id of type is not added in collection User')
        }

        return res.status(200).json('Type is added');
      }
    }
    catch (err) {
      logger.error('Error: Add type', err);
      res.status(500).json(err);
    }
  },

    /**
     * @request PUT /api/v1/types/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async updateTypeWithImage(req, res, next) {
    if (req.files.length === 1) {
      try {
        logger.info('Update type and image of it', req.body, req.params);
        removeImage(req.body.data.id);

        let type = await Type.findById(req.params.id);
        if (!type) {
          return res.status(400).json('Type is not found');
        }

        type.name = req.body.data.name;
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

    /**
     * @request PUT /api/v1/types/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async updateTypeWithoutImage(req, res) {
    try {
      logger.info('Update only data of type', req.body);
      let type = await Type.findById(req.params.id);

      if (!type) {
        return res.status(400).json('Type is not found');
      }

      const arr = type.image.split('.');
      const index = arr.length - 1;
      const newName = req.body.data.name + '.' + arr[index];
      fs.rename('uploads/' + type.image, 'uploads/' + newName);

      type.name = req.body.data.type;
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

    /**
     * @request DELETE /api/v1/types/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
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

/**
 * @param id
 * @returns {Promise.<void>}
 */
async function removeImage(id) {
  const type = await Type.findOne({id_type: id});
  if (type) {
    fs.unlink('uploads/' + result.image);
  }
}
