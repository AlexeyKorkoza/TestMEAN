var multer = require('multer');
var types = require('./types');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.' + file.mimetype.split('/')[1]);
  }
});

function processUploadImage(err,req, res, next) {
  req.body.image = req.file.originalname;
  if(err){
    res.send(err);
  } else {
    next();
  }
}

var uploadImage = [upload.single('image'), processUploadImage, types.add];

module.exports = {
  uploadImage: uploadImage
};