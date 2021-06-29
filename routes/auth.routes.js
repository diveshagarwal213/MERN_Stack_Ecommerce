const express = require('express');
const router = express.Router();

//controllers
const { register, login, logout, forgotPassword, resetPassword } = require('../controllers/auth');

//routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').post(resetPassword);
router.route('/logout').get(logout);

module.exports = router;