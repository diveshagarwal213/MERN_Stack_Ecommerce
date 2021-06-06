const express = require('express');
const router = express.Router();

const { allProducts , mostPopular, productName, productId } = require("../controllers/public");

//router("/register",() =>{});
router.route("/allproducts").get(allProducts);
router.route("/mostpopular").get(mostPopular);
router.route("/productname/:name").get(productName);
router.route("/productid/:id").get(productId);

module.exports = router;