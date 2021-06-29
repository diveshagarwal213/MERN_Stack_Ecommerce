const express = require('express');
const router = express.Router();

//controllers
const { register, login, logout } = require('../controllers/auth');

//routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;