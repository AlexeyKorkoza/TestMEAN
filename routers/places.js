'use strict';

import express from "express";
import placeController from '../controllers/placeController';
const router = express();

router.get("/", placeController.getPlaces);
router.get("/:id", placeController.getPlaceById);
router.post("/", placeController.getPlacesByType);
router.post("/add", placeController.addPlace);
router.put("/:id", placeController.updatePlace);
router.delete("/:id", placeController.removePlace);

export default router;
