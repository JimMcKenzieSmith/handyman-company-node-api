const {Customer, validate} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  }
  catch(ex) {
    next(ex);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    });
    customer = await customer.save();
    
    res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        phone: req.body.phone
      }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
  }
  catch (ex) {
    next(ex);
  }
});

module.exports = router; 