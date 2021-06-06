const express = require('express');
const creatErr = require('http-errors');
require('dotenv').config();
//PORT
const PORT = process.env.PORT || 5000 ;

//db_connect
require('./config/db');

//express
const app = express();
app.use(express.json());

//routes
app.use('/public', require('./routes/public.routes'));
app.use('/admin', require('./routes/admin.routes'));

//404 routes 
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
    console.log(`server_UP ${PORT}`);
});