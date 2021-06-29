const User = require('../models/User.model');
const createErr = require('http-errors');
const {userJoiSchema, loginSchema} = require('../utils/joiSchemas');
const jwt = require('jsonwebtoken');

const register = async (req,res,next) => {
    try {
        const result = await userJoiSchema.validateAsync(req.body); //joi
        
        const doseExist = await User.findOne({email: result.email});
        if(doseExist) throw createErr.Conflict(`${result.email} is already been register`);
        
        const user = new User(result);
        const saveUser = await user.save();
        const accessToken = await saveUser.getAccessToken();

        if(!accessToken) throw createErr.InternalServerError("jwt error");
        res.send({accessToken});
    
    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
};

const login = async (req,res,next) => {
    try {
        const result = await loginSchema.validateAsync(req.body) //Joi validater
            
        const user = await User.findOne({email: result.email}).select("+password");

        if(!user) throw createErr.Unauthorized("Invalid Credentials");

        const isMatch = await user.checkCredentials(result.password);
        if(!isMatch) throw createErr.Unauthorized("Invalid Credentials")

        const accessToken = await user.getAccessToken();
        
        if(!accessToken) throw createErr.InternalServerError("jwt error");

        res.send({accessToken});

   } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error)   
   } 
};

const logout = async (req, res, next) => {
    try {
        let token, tokenId, userId;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        };

        jwt.verify(token, process.env.JWT_KEY , (error,playload)=>{
            if(error) throw createErr.BadRequest("Token not valid");
            tokenId = playload.jti;
            userId = playload.id;
        });
        
        //delete current token
        const deltoken = await User.updateOne( { '_id': userId }, { $pull: { tokens: { token: tokenId } } });
        
        //delete old tokens
        let oldDate = new Date();
        oldDate.setDate(oldDate.getDate()-32);
        const delOldTokens = await User.updateOne( { '_id': userId }, { $pull: { rtokens: { created_at: {$lt: oldDate } }  } });
        res.send("logout");

    } catch (error) {
        next(error);
    }
};

module.exports = {register, login, logout};