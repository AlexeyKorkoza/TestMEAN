

import express from 'express';
import placeController from '../controllers/placeController';
import token from '../middlewares/token';

const router = express();

router.get('/', token.required, placeController.getPlaces);
router.get('/:id', token.required, placeController.getPlaceById);
router.get('/type/:id', token.required, placeController.getPlacesByType);
router.post('/add', token.required, placeController.addPlace);
router.put('/:id', token.required, placeController.updatePlace);
router.delete('/:id', token.required, placeController.removePlace);

export default router;
