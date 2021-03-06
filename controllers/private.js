const Product = require('../models/Product.models');
const createErr = require('http-errors');
const Order = require('../models/Orders.model');
const User = require('../models/User.model');
const {AddressSchema} = require('../utils/joiSchemas');

const placeOrders = async (req, res, next) => {
    const {items, selectedDate} = req.body;
    const userId = req.rootUser._id;
    let userItems = [], productarr = [];
    let p, xprice;

    try {
        //fetch user selected items & totalprice of a single item (qty * price) 
        for (const x of items) {
           p = await Product.findOne({_id: x._id});
           xprice = x.qty * p.price;
           productarr = [{
            ...x, 
            totalprice: xprice,
            price: p.price,
            image: p.image,
            name: p.name
           }];
           userItems = [...productarr, ...userItems];
        }
        
        //price logic
        const subtotal = userItems.reduce((a, c) => a + c.totalprice , 0);
        const shippingprice = subtotal > 300 ? 0 : 30;
        //const taxPrice = subtotal * 0.03;
        const totalPrice = subtotal + shippingprice;

        const order = {
            userId,
            userItems,
            subtotal,
            shippingprice,
            totalPrice,
            selectedDate,
            paymentMethod:"CASH" //solid
        }
        const finalOrder = new Order(order);
        const placedOrder = await finalOrder.save();
        res.send(placedOrder);   
    } catch (error) {
        next(error)
    }
}

const FetchUsersOrders = async (req,res,next) => {
    const userId = req.rootUser._id;
    try {
        const userOrders = await Order.find({userId: userId}).sort({createdAt: -1});
        res.send({userOrders});
    } catch (error) {
        next(error)
    }
};

const AddUserAddress = async (req,res,next)=>{
    const  { address } = req.body;
    const userId = req.rootUser._id;
     try {
        const validAddress = await AddressSchema.validateAsync(address); 
        const result = await User.updateOne({_id:userId},{$set: {address: validAddress}});
        res.send(result);
    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
}

const privatetest = (req,res,next) => {
    const {username, email, _id} = req.rootUser;  
    res.send(req.rootUser);
};



module.exports = {placeOrders, FetchUsersOrders, privatetest, AddUserAddress };