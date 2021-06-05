const express = require('express');
const router = express.Router();

const { allProducts } = require("../controllers/public");

//router("/register",() =>{});
router.route("/allproducts").get(allProducts);

module.exports = router;