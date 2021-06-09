const express = require('express');
const router = express.Router();

//middleware
const {fileUpload} = require('../middleware/fileUplod');

//controllers
const { addProduct , testaddProducts } = require('../controllers/admin')

//routes
router.route('/addproduct').post(fileUpload.single('images'), addProduct );

module.exports = router;
