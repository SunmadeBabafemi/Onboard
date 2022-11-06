const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})

exports.addUniversitySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
})

exports.searchSchema = Joi.object({
  search: Joi.string().required(),
})