import Place from '../models/place';
import logger from '../utils/logger';

export default {

  /**
   * @request GET /api/v1/places
   * @param req
   * @param res
   * @returns {Promise.<void>}
  */
  async getPlaces(req, res) {
    try {
      const places = await Place.find({});
      logger.info('Get places');
      return res.status(200).json(places);
    }
    catch (err) {
      logger.error('Error: Get places', err);
      res.status(500).json(err);
    }
  },

    /**
     * @request GET /api/v1/places/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
    */
  async getPlaceById(req, res) {
    try {
      const place = await Place.findOne({_id: req.params.id});
      logger.info('Get place by id', req.params);
      if (!place) {
        return res.status(200).json('Place is not found');
      }

      return res.status(200).json(place);
    }
    catch (err) {
      logger.error('Error: Get place by id', err);
      res.status(500).json(err);
    }
  },

    /**
     * @request GET /api/v1/places/type/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async getPlacesByType(req, res) {
    try {
      const places = await Place.find({id_type: req.params.id});
      logger.info('Get place by type', req.params);
      if (!places.length) {
        return res.status(200).json('Places are not found');
      }

      return res.status(200).json(places);
    }
    catch (err) {
      logger.error('Error: Get place by type', err);
      res.status(500).json(err);
    }
  },
    /**
     * @request POST /api/v1/places
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async addPlace(req, res) {
    try {
      const place = new Place({
        name_place: req.body.name_place,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng,
        address: req.body.address,
        name_type: req.body.name_type,
        id_type: req.body.id_type
      });

      logger.info('Add place', req.body);
      const result = await place.save();
      if (!result) {
          return res.status(400).json('Place is not added')
      }

      return res.status(200).json('Place is added');
    }
    catch (err) {
      logger.error('Error: Add place', err);
      res.status(500).json(err);
    }
  },

    /**
     * @request PUT /api/v1/places/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async updatePlace(req, res) {
    try {
      const place = await Place.findById(req.params.id);
      logger.info('Update place', req.params.id, req.body);
      if (!place) {
        return res.status(400).json('place is not found');
      }

      place.name_place = req.body.name_place;
      place.description = req.body.description;
      place.id_type = req.body.id_type;

      if (req.body.lat && req.body.lng && req.body.address) {
          place.address = req.body.address;
          place.lat = req.body.lat;
          place.lng = req.body.lng;
      }

      const result = place.save();
      if (!result) {
        return res.status(400).json('place is not updated');
      }

      return res.status(200).json('place is updated');
    }
    catch (err) {
      logger.info('Error: Update place', err);
      res.status(500).json(err);
    }
  },

    /**
     * @request DELETE /api/v1/places/:id
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
  async removePlace(req, res) {
    try {
      logger.info('Remove place', req.params.id);
      const place = await Place.findByIdAndRemove({_id: req.params.id});
      if (!place) {
        return res.status(400).json('place is not removed');
      }

      return res.status(200).json('place is removed');
    }
    catch (err) {
      logger.error('Error: Remove place', err);
      res.status(500).json(err);
    }
  }
}
