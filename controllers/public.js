const Product = require('../models/Product.models');
const creatErr = require('http-errors')

//return all products ,  catagroites & limit are optional 
const allProducts = async (req, res, next) => {
    try {
        let allProducts, limitno;
        const { categories , limit } = req.query;
        
        if(limit) { limitno = Number(limit);};

        if (categories){
            if(limit){
                allProducts = await Product.find({categories : categories}).sort({createdAt : -1 }).limit(limitno);
            }else{
                allProducts = await Product.find({categories : categories}).sort({createdAt : -1 });
            }
            
        }else{
            if(limit){
                allProducts = await Product.find().sort({createdAt : -1 }).limit(limitno);
            }else{
                allProducts = await Product.find().sort({createdAt : -1 });
            }
        }

        if(allProducts.length <= 0) throw creatErr.BadRequest("No Products found");
        
        res.send({products : allProducts});

    } catch (error) {
        next(error)
    }
};

const mostPopular = async(req, res, next) => {
    try {
        let allProducts, limitno;
        const { limit } = req.query;
        if(limit) { limitno = Number(limit);}

        if(limit){
            allProducts = await Product.find().sort({totalorders : -1 }).limit(limitno);
        }else{
            allProducts = await Product.find().sort({totalorders : -1 });
        }

        if(allProducts.length <= 0) throw creatErr.BadRequest("No Products found");

        res.send({products : allProducts});

    } catch (error) {
        next(error);
    }
};

const productName = async(req, res, next) => {
    try {
        const {name} = req.params
        
        const products = await Product.find({name : {$regex: name, $options: 'i'}});
        
        if(products.length <= 0) throw creatErr.BadRequest("No products found")
        
        res.send({products});
    } catch (error) {
        next(error)
    }
};

const productId = async (req, res, next) => {
    try{
        const { id } = req.params
        console.log(id);
        const product = await Product.findOne({_id: id});
        
        if(!product) throw creatErr.BadRequest();

        res.send({product});
    } catch(error) {
        next(error)
    }
};

module.exports = {allProducts, mostPopular, productName, productId};