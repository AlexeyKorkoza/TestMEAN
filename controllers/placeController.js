import placeModel from '../models/place';

export default {

  getPlaces(req, res) {
    placeModel.find({}, (err, places) => {
      if (err) {
        res.send(err);
      } else {
        res.send(places);
      }
    });
  },

  getPlaceById(req, res) {
    placeModel.findOne({_id: req.params.id}, (err, place) => {
      if (err) {
        res.send(err);
      } else {
        res.send(place);
      }
    });
  },

  getPlacesByType(req, res) {
    placeModel.find({id_type: req.body.id}, (err, places) => {
      if (err)
        res.send(err);
      res.json(places);
    });
  },

  addPlace(req, res) {
    const place = new placeModel({
      name_place: req.body.name_place,
      description: req.body.description,
      lat: req.body.lat,
      lng: req.body.lng,
      address: req.body.address,
      name_type: req.body.name_type
    });
    place.save((err, places) => {
      if (err) {
        res.send(err);
      } else {
        res.send(places);
      }
    });
  },

  updatePlace(req, res) {
    placeModel.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {runValidators: true},
      (err, places) => {
        if (err) {
          res.send(err);
        } else {
          res.send(places);
        }
      }
    );
  },

  removePlace(req, res) {
    placeModel.findByIdAndRemove({_id: req.params.id}, (err, place) => {
      if (err) {
        res.send(err);
      } else {
        res.send(place);
      }
    });
  }
}
