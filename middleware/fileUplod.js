const multer = require('multer');
const createErr = require('http-errors')

const fileStorageEng = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/product");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileLimit = {
    fileSize: 5000000
}

const fileUpload = multer({
    storage : fileStorageEng,
    limits: fileLimit,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)){
            return cb(new createErr.BadRequest("please provide a valid file") );
        }
        cb(null, true);
    }
});

module.exports = {fileUpload};