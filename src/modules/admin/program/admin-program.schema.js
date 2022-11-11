const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.uniPgParamsSchema = Joi.object().keys({
    uni_id: Joi.string().required(),
    pg_id: Joi.string().required(),
})

exports.addProgramSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().positive().required(),
})

exports.editProgramSchema = Joi.object().keys({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  duration: Joi.number().positive().optional(),
})
exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})

exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});