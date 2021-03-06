const {HandymanService, validate} = require('../models/handymanService'); 
const {ServiceCategory} = require('../models/serviceCategory');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const handymanServices = await HandymanService.find().sort('name');
    res.send(handymanServices);
  }
  catch (ex) {
    next(ex);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    console.log("id:",req.body.serviceCategoryId);

    const serviceCategory = await ServiceCategory.findById(req.body.serviceCategoryId);
    if (!serviceCategory) return res.status(400).send('Invalid handyman service category.');

    let handymanService = new HandymanService({ 
      title: req.body.title,
      serviceCategory: {
        _id: serviceCategory._id,
        name: serviceCategory.name
      },
      price: req.body.price
    });
    handymanService = await handymanService.save();
    
    res.send(handymanService);
  }
  catch (ex) {
    next(ex);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const serviceCategory = await ServiceCategory.findById(req.body.serviceCategoryId);
    if (!serviceCategory) return res.status(400).send('Invalid handyman service category.');

    const handymanService = await HandymanService.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        serviceCategory: {
          _id: serviceCategory._id,
          name: serviceCategory.name
        },
        price: req.body.price
      }, { new: true });

    if (!handymanService) return res.status(404).send('The handyman service with the given ID was not found.');
    
    res.send(handymanService);
  }
  catch (ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const handymanService = await HandymanService.findByIdAndRemove(req.params.id);

    if (!handymanService) return res.status(404).send('The handyman service with the given ID was not found.');

    res.send(handymanService);
  }
  catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const handymanService = await HandymanService.findById(req.params.id);

    if (!handymanService) return res.status(404).send('The handyman service with the given ID was not found.');

    res.send(handymanService);
  }
  catch (ex) {
    next(ex);
  }
});

module.exports = router; 