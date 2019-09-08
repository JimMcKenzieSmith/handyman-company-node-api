const {ServiceCategory, validate} = require('../models/serviceCategory');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const serviceCategories = await ServiceCategory.find().sort('name');
  res.send(serviceCategories);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let serviceCategory = new ServiceCategory({ name: req.body.name });
  serviceCategory = await serviceCategory.save();
  
  res.send(serviceCategory);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const serviceCategory = await ServiceCategory.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!serviceCategory) return res.status(404).send('The category with the given ID was not found.');
  
  res.send(serviceCategory);
});

router.delete('/:id', async (req, res) => {
  const serviceCategory = await ServiceCategory.findByIdAndRemove(req.params.id);

  if (!serviceCategory) return res.status(404).send('The category with the given ID was not found.');

  res.send(serviceCategory);
});

router.get('/:id', async (req, res) => {
  const serviceCategory = await ServiceCategory.findById(req.params.id);

  if (!serviceCategory) return res.status(404).send('The category with the given ID was not found.');

  res.send(serviceCategory);
});

module.exports = router;