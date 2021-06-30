const User = require('../models/User.model');
const createErr = require('http-errors');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    let token, tokenId, userId;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        };
        
        //if(!token) return next( new createErr.BadRequest());
        if(!token) throw new createErr.BadRequest();

        jwt.verify(token, process.env.JWT_KEY , (error,playload)=>{
            if(error) throw createErr.Forbidden();
            tokenId = playload.jti;
            userId = playload.id;
        });

        const rootUser = await User.findOne({_id: userId, 'tokens.token': tokenId});
        if(!rootUser) throw new createErr.Unauthorized();

        req.rootUser = rootUser;
        next();

    } catch (error) {
        next(error);
    }

};

module.exports = {authMiddleware};