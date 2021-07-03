const User = require('../models/User.model');
const createErr = require('http-errors');
const {userJoiSchema, loginSchema} = require('../utils/joiSchemas');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createRootUser =  (userData) => {
    return {
        email: userData.email,
        username: userData.username
    }
};

const register = async (req,res,next) => {
    try {
        const result = await userJoiSchema.validateAsync(req.body); //joi
        
        const doseExist = await User.findOne({email: result.email});
        if(doseExist) throw new createErr.Conflict(`${result.email} is already been register`);
        
        const user = new User(result);
        const saveUser = await user.save();
        const accessToken = await saveUser.getAccessToken();

        if(!accessToken) throw new createErr.InternalServerError("jwt error");
        const rootUser = createRootUser(saveUser);
        res.send({accessToken, rootUser});
    
    } catch (error) {
        if(error.isJoi === true) error.status = 422;
        next(error);
    }
};

const login = async (req,res,next) => {
    try {
        const result = await loginSchema.validateAsync(req.body) //Joi validater
            
        const user = await User.findOne({email: result.email}).select("+password");

        if(!user) throw new createErr.Unauthorized("Invalid Credentials");

        const isMatch = await user.checkCredentials(result.password);
        if(!isMatch) throw new createErr.Unauthorized("Invalid Credentials")

        const accessToken = await user.getAccessToken();
        
        if(!accessToken) throw new createErr.InternalServerError("jwt error");

        const rootUser = createRootUser(user);

        res.send({accessToken, rootUser});

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
        if(!token) throw new createErr.BadRequest("Try again")
        
        jwt.verify(token, process.env.JWT_KEY , (error,playload)=>{
            if(error) throw new createErr.BadRequest("Token not valid");
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

const forgotPassword = async (req, res,next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if(!user) throw new createErr.BadRequest();

        const resetPassToken = await user.getResetPassToken();
        if(!resetPassToken) throw new createErr.InternalServerError();
        const resetUrl = `http://localhost:5000/auth/resetpassword/${resetPassToken}`;
            
        const message = ` this is in for an exapmple, in real life/production this link "${resetUrl}" will send to the user email `;
        //<a href="${resetUrl}" clicktracking="off" >Reset Password</a>
        

        res.send({message});

    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req,res,next) => {
    const resetPassToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex");
    const {password} = req.body;
    try {
        if(!resetPassToken) throw new createErr.Unauthorized()
        const user = await User.findOne({
            resetPassToken,
            resetPassExpire: {$gt : Date.now()}
        });

        if(!user) throw new createErr.Unauthorized();

        user.password = req.body.password;
        user.resetPassToken = undefined;
        user.resetPassExpire = undefined;

        await user.save(); 
        
        res.send("ok");

    } catch (error) {
        next(error);
    }
        
};

module.exports = {register, login, logout, forgotPassword, resetPassword};