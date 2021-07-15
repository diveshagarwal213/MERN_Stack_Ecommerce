const express = require('express');
const router = express.Router();

//middleware
const {fileUpload} = require('../middleware/fileUplod');

//controllers
const { addProduct , updateProduct, deleteProduct, fetchOrders, updateOrdersState, FetchSingleUser } = require('../controllers/admin')

//routes
router.route('/addproduct').post(fileUpload.single('images'), addProduct );
router.route('/updateproduct').post(fileUpload.single('images'), updateProduct );
router.route('/updateordersstate').post(updateOrdersState);
router.route('/deleteproduct/:id').get( deleteProduct );
router.route('/fetchorders').get(fetchOrders);
router.route('/fetchsingleuser/:id').get(FetchSingleUser);

module.exports = router;
