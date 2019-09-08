const Joi = require('joi');
const mongoose = require('mongoose');
const {serviceCategorySchema} = require('./serviceCategory');

const HandymanService = mongoose.model('HandymanServices', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  serviceCategory: { 
    type: serviceCategorySchema,  
    required: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0,
    max: 1000
  }
}));

function validateHandymanService(handymanService) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    serviceCategoryId: Joi.string().min(1).required(),
    price: Joi.number().min(0).required()
  };

  return Joi.validate(handymanService, schema);
}

exports.HandymanService = HandymanService; 
exports.validate = validateHandymanService;