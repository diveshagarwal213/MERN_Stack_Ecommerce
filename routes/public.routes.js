const express = require('express');
const router = express.Router();

const { products,  mostPopular, productName, productId, images, allDistinctCategories, CatAndFlav } = require("../controllers/public");

//router("/register",() =>{});
router.route("/products").get(products);
router.route("/mostpopular").get(mostPopular);
router.route("/productname/:keyword").get(productName);
router.route("/productid/:id").get(productId);
router.route("/images/:filename").get(images);
router.route("/alldistinctcategories").get(allDistinctCategories);
router.route("/catandflav").get(CatAndFlav);

module.exports = router;