const Product = require('../models/Product.models');
const creatErr = require('http-errors');
const pagination = require('../utils/pagination');
const path = require('path');
const {StringToArray} = require('../utils/Other'); 

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
        let products = [];
        const {keyword} = req.params

        products = await Product.find({name : {$regex: keyword, $options: 'i'}});

        if(products.length <= 0) throw creatErr.BadRequest("No products found");

        res.send({products});
    } catch (error) {
        next(error);
    }
};

const CatAndFlav = async (req, res, next) => {
    let products =[];
    const { categories, flavors} = req.query
    let categorie = StringToArray(categories);
    let flavor = StringToArray(flavors);

    try {
        if(categories){
            if(flavors){
                products = await Product.find({$and : [{categories: {$all : categorie}}, {flavors: {$in : flavor}}]});
            }else{
                products = await Product.find({categories: {$in : categorie}});
            }
        }else{
            products = await Product.find({flavors: {$in : flavor}});
        }
        
        if(products.length <= 0) throw creatErr.BadRequest("No products found");
        
        res.send({products});
    } catch (error) {
        next(error);
    }
    
};

const productId = async (req, res, next) => {
    try{
        const { id } = req.params
        
        if(!id.match(/^[0-9a-fA-F]{24}$/)) throw creatErr.BadRequest("Not a Valid Product");

        const product = await Product.findOne({_id: id});
        
        if(!product) throw creatErr.BadRequest();

        res.send({product});
    } catch(error) {
        next(error)
    }
};

//fetch New products based on =>  pagination-limit || pagination-category-limit ||  limit || categorie || categorie-limit
const products = async (req, res, next) => {
    let  limit = parseInt(req.query.limit);
    let  page = parseInt(req.query.page);
    const { categories  } = req.query;

    let products, data;
    
    try {

        if (page) {
            if(!limit) limit = 3 ;//default limit in pagination
            
            if(categories){
                products = await Product.find({categories : categories}).sort({createdAt : -1 });
            }else{
                products = await Product.find().sort({createdAt : -1 });
            }
            
            if(products.length <= 0) throw creatErr.BadRequest("No Products found");
            
            data = pagination(products, page, limit);
        
        } else if(limit) {

            if(categories){
                products = await Product.find({categories : categories}).sort({createdAt : -1 }).limit(limit);
            }else{
                products = await Product.find().sort({createdAt : -1 }).limit(limit);
            }
            
            if(products.length <= 0) throw creatErr.BadRequest("No Products found");
            
            data = {products};

        }else{
            if(categories){
                products = await Product.find({categories : categories}).sort({createdAt : -1 });
            }else{
                products = await Product.find().sort({createdAt : -1 });
            }
            
            if(products.length <= 0) throw creatErr.BadRequest("No Products found");
            
            data = {products};
        }
        
        res.send(data);

    } catch (error) {
        next(error)
    }
};

// image request
const images =  (req, res, next) => {
    try{
        const {filename} = req.params;
        let reqPath = path.join(__dirname, '../');
        res.sendFile(`images/product/${filename}`, { root: reqPath });
    }catch(error){
        next(error)
    }
};

const allDistinctCategories = async (req, res, next) => {
    try {
        const  {fav} = req.query
        let flavors;
        if(fav){
            flavors = await Product.distinct("flavors");
        }
            const  categories = await Product.distinct("categories");
        res.send({categories, flavors });
    } catch (error) {
        next(error)
    }
}; 

module.exports = {products,  mostPopular, productName, productId, images, allDistinctCategories, CatAndFlav};