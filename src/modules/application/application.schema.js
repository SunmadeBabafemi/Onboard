const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.createApplicationSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  email: Joi.string().required(),
  nationality: Joi.string().required(),
  gender: Joi.string().required(),
})

exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})

exports.applicationIdSchema = Joi.object({
  course_id: Joi.string().required(),
  class_id: Joi.string().required(),
})

exports.seaerchApplicationSchema = Joi.object({
  tracking_id: Joi.string().required(),
})

exports.viewApplicationSchema = Joi.object({
  access_code: Joi.string().required(),
})