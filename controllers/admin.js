const Product = require('../models/Product.models');
const {productJoi} = require('../utils/joiSchemas')
const createErr = require('http-errors');
const fs = require('fs');
const path = require('path');


const addProduct = async (req, res, next) => {

    
    try {
        if(!req.file) throw createErr.BadRequest("no image found"); // uplod file middleware
        
        const newFileName = req.file.filename; 
        const data = req.body // [object:null prototype ] {name: "" ,...}
        const {name, price, about, categories} = data;
        
        //categories string to array
        let arrCategories = categories.trim();
        arrCategories = arrCategories.split(" ");
        if(arrCategories[0] === '' || arrCategories[0] === null){
            arrCategories = [];
        }

        const productData = {
            name: name,
            price: price,
            about: about,
            categories: arrCategories,
            image: newFileName
        }
        const validProduct = await productJoi.validateAsync(productData);

        const doseExist = await Product.findOne({name: validProduct.name});
        if(doseExist) throw createErr.Conflict(`${validProduct.name} is already been used`);

        const product = new Product(validProduct);
        const addProduct = await product.save();

        res.send(addProduct);

    } catch (error) {
        if(error.isJoi === true) error.status = 422;

        if(req.file){
            let path = `./images/${req.file.filename}`
            fs.unlink(path, (err) => {
                if (err) {
                  console.error(err)
                }
                //file removed if saved
            });
        }

        next(error);
    }
}

module.exports = { addProduct };