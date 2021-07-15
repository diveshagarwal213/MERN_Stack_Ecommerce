const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

//controllers
const { placeOrders,FetchUsersOrders, privatetest } = require('../controllers/private');

//routes
router.route('/placeorder').post(authMiddleware, placeOrders);

router.route('/fetchuserorders').get(authMiddleware, FetchUsersOrders);
router.route('/privatetest').get(authMiddleware, privatetest);

module.exports = router;