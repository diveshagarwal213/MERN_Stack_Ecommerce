const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const createErr = require('http-errors');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "please provid a username"]
    },
    userRole:{
        type:String,
        default:"USER"
    },
    email: {
        type: String,
        require: [true, "please provid a email"],
    },
    password:{
        type: String,
        require: [true, "please add a password"],
        minlength: 4,
        select: false 
    },
    address:{
        street: String,
        city:String,
        state:{
            type:String,
            uppercase:true,
        },
        zip:Number,
        mobNumber:Number
    },
    mobileNumber:{
        type:Number
    },
    tokens: [
        {
            token:{
                type:String,
                require: true
            },
            created_at: {
                type: Date,
                default: new Date()
            }
        }
    ],
    resetPassToken: String,
    resetPassExpire: Date

});

//hashing password
UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash( this.password, salt);
    next();
});

//check Credentials
UserSchema.methods.checkCredentials = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// creat token and save its id to  data base
UserSchema.methods.getAccessToken = async function () {
    try {
        const jwtId = `${Date.now()}-${crypto.randomBytes(12).toString('hex')}`;
        const options = {
            expiresIn: '30 days',
            issuer: "localhost.com",
            jwtid: jwtId
        };
        let token;
        jwt.sign({id:this._id}, process.env.JWT_KEY,options, (err,tokens) => {
            if(err){
                throw new Error(err);
            }
            token = tokens;
        });

        this.tokens = this.tokens.concat({token: jwtId});
        await this.save();
        return token;
    } catch (error) {
        //console.log(error);
        return null;
    }
};


//reset_password_token
UserSchema.methods.getResetPassToken = async function (){
    try {
        const resetToken = crypto.randomBytes(20).toString("hex");
        this.resetPassToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        this.resetPassExpire = Date.now() + 10 * (60 * 1000); //10min
        await this.save();
        return resetToken;
    } catch (error) {
        return null;
    }
}

const User = mongoose.model('users', UserSchema);

module.exports = User;