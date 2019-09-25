const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/servicesOne', {
    userNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected')
});

mongoose.connection.on('error', (err)=>{
    console.log(err, 'Mongoose failed to connect')
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose is disconnected')
});