const Product = require('../models/Product.models');
const {productJoi} = require('../utils/joiSchemas')
const createErr = require('http-errors');

const addProduct = async (req,res,next) => {
    
    try {
        const data = await productJoi.validateAsync(req.body);

        const doseExist = await Product.findOne({name: data.name});
        if(doseExist) throw createErr.Conflict(`${data.name} is already been used`);

        const product = new Product(data);
        const addProduct = await product.save();
        res.status(200).send("Product saved");

    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }

}

module.exports = { addProduct };