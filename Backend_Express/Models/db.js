const mongoose = require('mongoose');
var dbURI = "mongodb+srv://admin:12admin34@ittweb-assignment1.4mkid.mongodb.net/ITTWEB-Assignment1?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connectet', () => {
    console.log('Mongoose connectet to ${dbURI}');
})
mongoose.connection.on('eroor', err => {
    console.log("Mongoose connection error" + err);
});
mongoose.connection.on('disconnected', () => {
    console.log("Disconnected");
});

const gracefulShutdown = (msg, callback) =>{
    mongoose.connection.close(() => {
        console.log("Mongoose disconnected through" + msg);
        callback();
    });
};
//nodemon restarts
process.once("SIGUSR2", () =>{
    gracefulShutdown("Nodemon restart", () =>{
        process.kill(process.pid, "SIGUSR2");
    });
});
//app termination
process.on("SIGINIT", () => {
    gracefulShutdown("APP termination", () => {
        process.exit(0);
    });
});
//Heroku app termination
process.on("SIGTERM", () => {
    gracefulShutdown("Heroku app shutdown", () => {
        process.exit(0);
    });
});

require('./User');
require('./WorkoutProgram');