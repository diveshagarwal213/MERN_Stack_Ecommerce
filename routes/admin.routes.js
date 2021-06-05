const express = require('express');
const router = express.Router();

const { addProduct } = require('../controllers/admin')


router.route('/addproduct').post(addProduct);

module.exports = router;
