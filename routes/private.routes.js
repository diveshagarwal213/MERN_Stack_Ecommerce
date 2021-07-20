const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

//controllers
const { placeOrders,FetchUsersOrders, privatetest, AddUserAddress } = require('../controllers/private');

//routes
router.route('/placeorder').post(authMiddleware, placeOrders);
router.route('/adduseraddress').post(authMiddleware, AddUserAddress);

router.route('/fetchuserorders').get(authMiddleware, FetchUsersOrders);
router.route('/privatetest').get(authMiddleware, privatetest);

module.exports = router;