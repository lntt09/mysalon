const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/login', async(req, res)=>{
    try{
        const foundUser = await User.findOne({
            username: req.body.username
        });
        if(foundUser){
            if(bcrypt.compareSynce(req.body.password, foundUser.password)){
                req.session.userId = foundUser._id;
                req.session.username = foundUser.username;
                req.session.logged = true;
                res.json({
                    status: {
                        code: 200
                    },
                    data: foundUser
                })
            }
            else{
                req.session.message = "Incorrect Username or Password, please try again";
                res.json({
                    status: {
                        code: 500,
                        message: "Invalid Credentials"
                    }
                })
            }
        }
        else{
            req.session.message = "Incorrect Username or Password, please try again";
            res.json({
                status: {
                    code: 500,
                    message: "Invalid Credentials"
                }
            })
        }
    }
    catch(err){
        res.send(err);
    }
});

router.post('/register', async(req, res)=>{
    const password = req.body.password;

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;

    try{
        const createdUser = await User.create(req.body);
        console.log(createdUser, ' created user');

        req.session.userId = createdUser._id;
        req.session.username = createdUser.username;
        req.session.logged = true;

        res.json({
            status: {
                code: 201
            }, 
            data: createdUser
        })
        req.redirect('/services');
    }
    catch(err){
        res.send(err);
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    })
});

module.exports = router;
