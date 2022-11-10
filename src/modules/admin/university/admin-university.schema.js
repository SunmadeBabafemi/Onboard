const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.addCourseParamsSchema = Joi.object().keys({
    uni_id: Joi.string().required(),
    pg_id: Joi.string().required(),
})

exports.addUniversitySchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
})

exports.editUniversitySchema = Joi.object().keys({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  country: Joi.string().optional(),
})
exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})


exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.searchSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
  search: Joi.string().required(),

});