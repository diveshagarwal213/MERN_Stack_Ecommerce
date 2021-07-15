const Product = require('../models/Product.models');
const Order = require('../models/Orders.model');
const User = require('../models/User.model');
const {productJoi} = require('../utils/joiSchemas')
const createErr = require('http-errors');
const path = require('path');
const {StringToArray, unlinkImage} = require('../utils/Other'); 


const addProduct = async (req, res, next) => {

    try {
        if(!req.file) throw createErr.BadRequest("no image found"); // uplod file middleware
        
        const newFileName = req.file.filename; 
        const {name, price, about, categories, flavors} = req.body; // [object:null prototype ] {name: "" ,...}

        const productData = {
            name: name,
            price: price,
            about: about,
            categories: StringToArray(categories),
            flavors: StringToArray(flavors),
            image: newFileName
        }
        const validProduct = await productJoi.validateAsync(productData);

        const doseExist = await Product.findOne({name: validProduct.name});
        if(doseExist) throw createErr.Conflict(`${validProduct.name} is already been used`);

        const product = new Product(validProduct);
        const addProduct = await product.save();
        //console.log(addProduct);
        res.send(addProduct);

    } catch (error) {
        if(error.isJoi === true) error.status = 422;

        if(req.file){
            let path = `./images/product/${req.file.filename}`
            unlinkImage(path);
        }

        next(error);
    }
}

const updateProduct = async (req, res ,next) => {
    
    const {name, price, about, categories, id, oldimgname, flavors} = req.body; // [object:null prototype ] {name: "" ,...}
    try {

        let productData = {
            name: name,
            price: price,
            about: about,
            categories: StringToArray(categories),
            flavors: StringToArray(flavors),
            image: oldimgname
        }

        if(req.file) productData = {...productData, image: req.file.filename};

        const validProduct = await productJoi.validateAsync(productData);

        const updateproduct = await Product.updateOne({_id : id},{$set: {...validProduct}} );

        if (req.file) { // must be last
            let path = `./images/product/${oldimgname}`;
            unlinkImage(path);
        }

        res.send("updated");

    } catch (error) {
        if(error.isJoi === true) error.status = 422;

        if(req.file){
            let path = `./images/product/${req.file.filename}`
            unlinkImage(path);
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
                unlinkImage(path);
            }
            res.send("Product Deleted");
        }else{
            throw  createErr.BadRequest("Not a object id");
        }
    } catch (error) {
        next(error);
    }
};

//CONFIRM (true) => PENDING => DELIVERY && (PENDING_PAYMENT //if cash payment) => COMPLETE 
//(flase) REJECT
const fetchOrders = async (req,res,next) => {    
    try {
         
        const confirmOrders = await Order.find({orderState: "CONFIRM"});
        const pendingOrders = await Order.find({orderState: "PENDING"});
        const deliveryOrders = await Order.find({orderState: "DELIVERY"});
        const completeOrders = await Order.find({orderState: "COMPLETE"}).limit(50);
        const rejectOrders = await Order.find({orderState: "REJECT"}).limit(50);
        res.send({
            confirmOrders,
            pendingOrders,
            deliveryOrders,
            completeOrders,
            rejectOrders
        });
    } catch (error) {
        next(error);
    }
};

const updateOrdersState = async (req,res,next) => {
    const {orderId, OrderState} = req.body;
    try {
        const updatedOrder = await Order.updateOne({_id:orderId},{orderState: OrderState});
        res.send(updatedOrder);
    } catch (error) {
        next(error);
    }
};

const FetchSingleUser = async (req,res,next) => {
    const {id} = req.params
    try {
        if(id.match(/^[0-9a-fA-F]{24}$/)){
            const user = await User.findOne({_id: id});
            res.send(user);
        }else{
            throw  createErr.BadRequest("Not a object id");
        }
    } catch (error) {
        next(error);
    }
}
module.exports = { addProduct, updateProduct, deleteProduct, fetchOrders, updateOrdersState, FetchSingleUser };