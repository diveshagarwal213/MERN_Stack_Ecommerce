const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please provid a ProductName"],
        trim:true,
        lowercase:true
    },
    price:{
        type: Number,
        required: [true,"please provid a ProductPrice"]
    },
    about: {
        type: String
    },
    categories:[
        {
            type:String,
            lowercase:true
        }
    ],
    flavors:[
        {
            type:String,
            lowercase:true
        }
    ],
    image:{
        type:String,
        required: [true,"please provid a ProductImage"]
    },
    totalorders:{
        type: Number,
        default: 0
    }
},
{
    timestamps:true
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;