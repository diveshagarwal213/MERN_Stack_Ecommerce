const express = require('express');
const router = express.Router();

const { products,  mostPopular, productName, productId, images } = require("../controllers/public");

//router("/register",() =>{});
router.route("/products").get(products);
router.route("/mostpopular").get(mostPopular);
router.route("/productname/:name").get(productName);
router.route("/productid/:id").get(productId);
router.route("/images/:filename").get(images);

module.exports = router;