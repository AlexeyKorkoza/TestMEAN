import Place from '../models/place';

export default {

  async getPlaces(req, res) {
    try {
      const places = await Place.find({});
      if (!places.length) {
        res.status(400).json('Places are not found');
      }

      res.status(200).json(places);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async getPlaceById(req, res) {
    try {
      const place = await Place.findOne({_id: req.params.id});
      if (!place) {
        res.status(400).json('Place is not found');
      }

      res.status(200).json(place);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async getPlacesByType(req, res) {
    try {
      const places = await Place.find({id_type: req.body.id});
      if (!places.length) {
        res.status(400).json('Places are not found');
      }

      res.status(200).json(places);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

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

      const result = await place.save();
      if (!result) {
        res.status(400).json('Place is not found')
      }

      res.status(200).json('Place is added');
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async updatePlace(req, res) {
    try {
      const place = req.body;

      const result = await Place.findOneAndUpdate({_id: req.params.id}, {$set: place}, {new: true});
      if (!result) {
        res.status(400).json('Place is not updated');
      }

      res.status(200).json('Place is updated');
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async removePlace(req, res) {
    try {
      const place = await Place.findByIdAndRemove({_id: req.params.id});
      if (!place) {
        res.status(400).json('Place is not removed');
      }

      res.status(200).json('Place is removed');
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
}
