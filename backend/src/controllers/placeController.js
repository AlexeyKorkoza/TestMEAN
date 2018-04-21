import mongoose from 'mongoose';
import Place from '../models/place';
import User from '../models/user';
import Type from '../models/type';
import logger from '../utils/logger';
import { forceArray } from '../helpers/array';

export default {

    /**
   * @request GET /api/v1/places
   * @param req
   * @param res
   * @returns {Promise.<void>}
  */
    async getPlaces(req, res) {
        try {
            const { _id } = req.session.user;
            const attributes = {
                password: 0,
                email: 0,
                date: 0,
                username: 0,
                types: 0,
            };

            if (req.query.typesIds) {
                const { typesIds } = req.query;
                if (!typesIds.length) {
                    forceArray(typesIds);
                }
                const types = await Type.find({'_id': {$in: typesIds}}).populate('places');
                logger.info('Get places by filter', req.query);
                return res.status(200).json(types);
            }

            const places = await User.findById(_id).select(attributes).populate('places');
            logger.info('Get places');
            return res.status(200).json(places.places);
        } catch (err) {
            logger.error('Error: Get places', err);
            return res.status(500).json(err);
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
            const { id } = req.params;
            const place = await Place.findById(id);
            logger.info('Get place by id', req.params);
            if (!place) {
                return res.status(200).json('Place is not found');
            }

            return res.status(200).json(place);
        } catch (err) {
            logger.error('Error: Get place by id', err);
            return res.status(500).json(err);
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
                name: req.body.name,
                description: req.body.description,
                lat: req.body.lat,
                lng: req.body.lng,
                address: req.body.address,
            });

            logger.info('Add place', req.body);
            let result = await place.save();
            if (!result) {
                return res.status(400).json('Place is not added');
            }

            const { _id } = req.session.user;
            const idPlace = result._id;
            result = await User.findByIdAndUpdate(_id, { $push: { places: idPlace } }, { new: true });
            if (!result) {
                return res.status(400).json('Id place is not added in collection User');
            }

            const idType = req.body._id;
            result = await Type.findByIdAndUpdate(idType, { $push: { places: idPlace } }, { new: true });
            if (!result) {
                return res.status(400).json('Id place is not added in collection Type');
            }

            return res.status(200).json('Place is added');
        } catch (err) {
            logger.error('Error: Add place', err);
            return res.status(500).json(err);
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

            place.name = req.body.name;
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
        } catch (err) {
            logger.info('Error: Update place', err);
            return res.status(500).json(err);
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
            const { _id } = req.session.user;
            const place = await Place.findByIdAndRemove({ _id: req.params.id });
            const placeIdInUser = await User.update(
                { "places": req.params.id },
                { "$pull": { 
                    "places": req.params.id } 
                }
            );
            const placeIdInType = await Type.update(
                { "places": req.params.id },
                { "$pull": { 
                    "places": req.params.id } 
                }
            );
            if (!place || !placeIdInUser || !placeIdInType) {
                return res.status(400).json('place is not removed');
            }

            return res.status(200).json('place is removed');
        } catch (err) {
            logger.error('Error: Remove place', err);
            return res.status(500).json(err);
        }
    },
};
