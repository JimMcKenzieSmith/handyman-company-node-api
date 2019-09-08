const {Job, validate} = require('../models/job'); 
const {HandymanService} = require('../models/handymanService'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const jobs = await Job.find().sort('-startDate');
  res.send(jobs);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const handymanService = await HandymanService.findById(req.body.handymanServiceId);
  if (!handymanService) return res.status(400).send('Invalid handyman service.');

  let job = new Job({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    handymanService: {
      _id: handymanService._id,
      title: handymanService.title,
      price: handymanService.price
    },
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  job = await job.save();

  
  res.send(job);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).send('The job with the given ID was not found.');

  res.send(job);
});

module.exports = router; 