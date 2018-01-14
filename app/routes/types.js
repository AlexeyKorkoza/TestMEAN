'use strict';

import express from 'express';
import multer from 'multer';
import typeController from '../controllers/typeController';
import token from '../middlewares/token';
const router = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({storage: storage});

router.get('/', token.required, typeController.getTypes);
router.get('/:id', token.required, typeController.getTypeById);
router.post('/add', token.required, upload.any(), typeController.addType);
router.put('/:id', token.required, upload.any(), typeController.updateTypeWithImage);
router.put('/:id', token.required, typeController.updateTypeWithoutImage);
router.delete('/:id', token.required, typeController.removeType);

export default router;
