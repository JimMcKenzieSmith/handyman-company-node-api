const Joi = require('joi');
const mongoose = require('mongoose');

const Job = mongoose.model('Job', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  handymanService: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      price: { 
        type: Number, 
        required: true,
        min: 0,
        max: 1000
      }   
    }),
    required: true
  },
  startDate: { 
    type: Date,
    required: true
  },
  endDate: { 
    type: Date,
    required: true
  }
}));

function validateJob(job) {
  const schema = {
    customerId: Joi.string().required(),
    handymanServiceId: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  };

  return Joi.validate(job, schema);
}

exports.Job = Job; 
exports.validate = validateJob;