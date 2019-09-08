const Joi = require('joi');
const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

function validateServiceCategory(serviceCategory) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  console.log("serviceCategory: ", serviceCategory);

  return Joi.validate(serviceCategory, schema);
}

exports.serviceCategorySchema = serviceCategorySchema;
exports.ServiceCategory = ServiceCategory; 
exports.validate = validateServiceCategory;