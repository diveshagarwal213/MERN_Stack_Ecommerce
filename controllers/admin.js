const Product = require('../models/Product.models');
const {productJoi} = require('../utils/joiSchemas')
const createErr = require('http-errors');
const fs = require('fs');
const path = require('path');


const addProduct = async (req, res, next) => {

    try {
        if(!req.file) throw createErr.BadRequest("no image found"); // uplod file middleware
        
        const newFileName = req.file.filename; 
        const {name, price, about, categories} = req.body; // [object:null prototype ] {name: "" ,...}
        
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
            let path = `./images/product/${req.file.filename}`
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

const updateProduct = async (req, res ,next) => {
    
    const {name, price, about, categories, id, oldimgname} = req.body; // [object:null prototype ] {name: "" ,...}
    try {

        //categories string to array
        let arrCategories = categories.trim();
        arrCategories = arrCategories.split(" ");
        if(arrCategories[0] === '' || arrCategories[0] === null){
            arrCategories = [];
        }

        let productData = {
            name: name,
            price: price,
            about: about,
            categories: arrCategories,
            image: oldimgname
        }

        if(req.file) productData = {...productData, image: req.file.filename};

        const validProduct = await productJoi.validateAsync(productData);

        const updateproduct = await Product.updateOne({_id : id},{$set: {...validProduct}} );

        if (req.file) { // must be last
            let path = `./images/product/${oldimgname}`;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                }
                // remove old image 
            });
        }

        res.send("updated");

    } catch (error) {
        if(error.isJoi === true) error.status = 422;

        if(req.file){
            let path = `./images/product/${req.file.filename}`
            fs.unlink(path, (err) => {
                if (err) {
                  console.error(err)
                }
                //file removed if saved
            });
        }
        next(error);
    }
};

const deleteProduct = async (req,res,next) => {
    const {id} = req.params
    try {
        if(id.match(/^[0-9a-fA-F]{24}$/)){
            const findProduct = await Product.findOne({_id : id});
            if(!findProduct) throw createErr.NotFound();
            const deleteProduct = await Product.deleteOne({_id : id});
            if(deleteProduct){
                let path = `./images/product/${findProduct.image}`
                fs.unlink(path, (err) => {
                    if (err) {
                    console.error(err)
                    }
                });
            }
            res.send("Product Deleted");
        }else{
            throw  createErr.BadRequest("Not a object id");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { addProduct, updateProduct, deleteProduct };