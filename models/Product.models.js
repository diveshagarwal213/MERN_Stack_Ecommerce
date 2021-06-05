const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true,"please provid a ProductName"],
        unique:true
    },
    price:{
        type: Number,
        require: [true,"please provid a ProductPrice"]
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
    image:{
        type:String,
        require: [true,"please provid a ProductImage"]
    }
},
{
    timestamps:true
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;