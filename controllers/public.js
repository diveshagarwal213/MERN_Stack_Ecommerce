const Product = require('../models/Product.models');

const allProducts = async (req, res, next) => {
    const allProducts = await Product.find().sort({createdAt : -1 });

    res.send(allProducts);
};

module.exports = {allProducts};