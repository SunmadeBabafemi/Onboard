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