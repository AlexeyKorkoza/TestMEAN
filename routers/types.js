import express from "express";
import typeController from '../controllers/typeController';
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "." + file.mimetype.split("/")[1]);
  }
});

var upload = multer({storage: storage});

router.get("/", typeController.getTypes);
router.get("/:id", typeController.getTypeById);
router.post("/add", upload.any(), typeController.addType);
router.put("/:id", upload.any(), typeController.updateTypeWithImage);
router.put("/:id", typeController.updateTypeWithoutImage);
router.delete("/:id", typeController.removeType);

module.exports = router;
