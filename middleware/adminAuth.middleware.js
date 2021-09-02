const User = require('../models/User.model');
const createErr = require('http-errors');
const jwt = require('jsonwebtoken');

const adminAuthMiddleware = async (req,res,next) => {
    let token, tokenId, adminId;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        };
        if(!token) throw new createErr.BadRequest();

        jwt.verify(token, process.env.JWT_KEY , (error,playload)=>{
            if(error) throw createErr.Forbidden();
            tokenId = playload.jti;
            adminId = playload.id;
        });

        const rootUser = await User.findOne({_id: adminId, 'tokens.token': tokenId});
        if(!rootUser) throw new createErr.Unauthorized();
        
        if(rootUser.userRole !== "ADMIN") throw new createErr.Unauthorized("not admin");
        
        req.rootUser = rootUser;
        next();

    } catch (error) {
        next(error);
    }
};

module.exports = {adminAuthMiddleware};
