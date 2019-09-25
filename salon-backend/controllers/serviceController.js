const express = require('express');
const router = express.Router();

const Service = require('../models/service');

router.get('/', async(req, res, next)=> {
    try{
        const allServices = await Service.find().populate('user');
        res.json({
            status: {
                code: 200,
                message: "Success"
            },
            data: allServices
        });
    }
    catch{
        res.send(err)
    }
});

router.post('/', async (req, res)=>{
    try{
        req.body.user = req.session.userId;
        const createdService = await Service.create(req.body);
        res.json({
            status: {
                code: 201,
                message: "Created Success"
            },
            data: createdService
        })
    }
    catch(err){
        res.send(err)
    }
});

router.get('/:id', async (req, res, next)=>{
    try{
        const foundService = await Service.findById(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "Successful"
            },
            data: foundService
        })
    }
    catch(err){
        res.send(err);
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const updateService = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: {
                code: 201,
                message: "Update Successfully"
            },
            data: updateService
        })
    }
    catch(err){
        res.send(err);
    }
});

router.delete('/:id', async(req, res)=>{
    try{
        const deleteService = await Service.findByIdAndRemove(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "Delete Successful"
            },
            data: deleteService
        })
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;