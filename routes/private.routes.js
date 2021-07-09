const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

//controllers
const { placeOrders, privatetest } = require('../controllers/private');

//routes
router.route('/placeorder').post(authMiddleware, placeOrders);

router.route('/privatetest').get(authMiddleware, privatetest);

module.exports = router;