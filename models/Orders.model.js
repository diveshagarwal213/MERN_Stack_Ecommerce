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
    orderState:{
        type:Boolean,
        default:undefined
    },
    
},
{
    timestamps:true
});