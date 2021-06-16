const express = require('express');
const router = express.Router();

//middleware
const {fileUpload} = require('../middleware/fileUplod');

//controllers
const { addProduct , updateProduct } = require('../controllers/admin')

//routes
router.route('/addproduct').post(fileUpload.single('images'), addProduct );
router.route('/updateproduct').post(fileUpload.single('images'), updateProduct );

module.exports = router;
