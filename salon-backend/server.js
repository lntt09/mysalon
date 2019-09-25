const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require ('cors');
const session = require('express-session');

require('./db/db');

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    console.log("This is who is logged in");
    console.log(req.session.userId);
    next();
})

const serviceController = require('./controllers/serviceController');
const userController = require('./controllers/userController');

app.use('/api/v1/services', serviceController);
app.use('/user', userController);

app.listen(process.env.PORT || 9000, ()=>{
    console.log('Connected Port 9000');
});