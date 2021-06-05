const mongoose = require('mongoose');

const DB = process.env.DataBase;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() => {
    console.log("DataBase_Up");
}).catch((err) => {
    console.log("DataBase_Down : ", err);
}); 

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

mongoose.connection.on('connected',() => {console.log("connection_up");});

mongoose.connection.on('error',(err) => {console.log(err.message);});

mongoose.connection.on('disconnected', () => {console.log("DataBase_Connection_closed");});

