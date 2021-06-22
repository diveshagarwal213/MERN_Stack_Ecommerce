const mongoose = require('mongoose');
const chalk = require('chalk');

const DB = process.env.DB_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() => {
    console.log(chalk.green.inverse("DataBase_UP"));
}).catch((err) => {
    console.log(err);
}); 

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

mongoose.connection.on('connected',() => console.log(chalk.yellow.inverse("CONNECTION_UP")));

mongoose.connection.on('error',(err) => console.log(chalk.red.inverse(`DataBase_Down :  ${err.message}`)));

mongoose.connection.on('disconnected', () => console.log(chalk.red.inverse("CONNECTION_DOWN")));

