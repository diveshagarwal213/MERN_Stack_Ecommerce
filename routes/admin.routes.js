const express = require('express');
const router = express.Router();

//middleware
const {fileUpload} = require('../middleware/fileUplod');

//controllers
const { addProduct , updateProduct, deleteProduct } = require('../controllers/admin')

//routes
router.route('/addproduct').post(fileUpload.single('images'), addProduct );
router.route('/updateproduct').post(fileUpload.single('images'), updateProduct );
router.route('/deleteproduct/:id').get( deleteProduct );

module.exports = router;
