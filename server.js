const express = require('express');
const creatErr = require('http-errors');
require('dotenv').config();
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');

//PORT
const PORT = process.env.PORT || 5000 ;

//db_connect
require('./config/db');

//express
const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

//routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/public', require('./routes/public.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/private', require('./routes/private.routes'));

//production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/client/build")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,'client','build', 'index.html'));
    });
    
}else{
    app.get('/',(req,res)=>{
        res.send("Api Running")
    });
}

//404 routes (will not work in production react handel 404) 
app.use(async (req,res,next) => {
    next(creatErr.NotFound());//http-error
});

//error handler
app.use((err,req,res,next) => {
    
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status|| 500,
            message: err.message,
        },
    });
});


//listen
app.listen(PORT, () => {
    console.log(chalk.blue.inverse(`server_UP ${PORT}`));
});