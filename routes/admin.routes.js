const express = require('express');
const router = express.Router();

//middleware
const {fileUpload} = require('../middleware/fileUplod');
const {adminAuthMiddleware} = require('../middleware/adminAuth.middleware');

//controllers
const { addProduct , updateProduct, deleteProduct, fetchOrders, updateOrdersState, FetchSingleUser } = require('../controllers/admin')

//routes
router.route('/addproduct').post(adminAuthMiddleware, fileUpload.single('images'), addProduct );
router.route('/updateproduct').post(adminAuthMiddleware, fileUpload.single('images'), updateProduct );
router.route('/updateordersstate').post(adminAuthMiddleware, updateOrdersState);
router.route('/deleteproduct/:id').get( adminAuthMiddleware, deleteProduct );
router.route('/fetchorders').get(adminAuthMiddleware, fetchOrders);
router.route('/fetchsingleuser/:id').get(adminAuthMiddleware,FetchSingleUser);

module.exports = router;
