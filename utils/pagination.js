const pagination =  (products, page, limit ) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result ={}
    
    if (endIndex < products.length) {
        result.next = {
            page: page + 1 ,
            limit: limit
        }
    }
    
    if(startIndex > 0 ){
        result.prev = {
            page: page - 1 ,
            limit: limit
        }
    }
    
    result.products = products.slice(startIndex, endIndex);

    return result;
};

module.exports = pagination;
