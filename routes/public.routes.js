const express = require('express');
const router = express.Router();

const { products,  mostPopular, productName, productId } = require("../controllers/public");

//router("/register",() =>{});
router.route("/products").get(products);
router.route("/mostpopular").get(mostPopular);
router.route("/productname/:name").get(productName);
router.route("/productid/:id").get(productId);

module.exports = router;