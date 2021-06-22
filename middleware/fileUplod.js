const multer = require('multer');

const fileStorageEng = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/product");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileUpload = multer({storage : fileStorageEng});

module.exports = {fileUpload};