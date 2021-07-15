const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{
        type : String,
        require : true
    },
    payment: {
        type:Boolean,
        default:false 
    },
    paymentMethod:{
        type:String,
        require:true
    },
    orderState:{
        type:String,
        default:"CONFIRM"
    },
    userItems:[],
    shippingprice: {
        type:Number,
    },
    subtotal : {
        type:Number,
        require:true
    },
    totalPrice:{
        type:Number,
        require: true
    },
    selectedDate: {
        type: Date,
        require: true
    }
    
},
{
    timestamps:true
});

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order ;