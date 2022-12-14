const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.addCourseParamsSchema = Joi.object().keys({
    uni_id: Joi.string().required(),
    pg_id: Joi.string().required(),
})

exports.paginateSchema = Joi.object().keys({
  limit: Joi.number().positive().required(),
  page: Joi.number().positive().required(),

})

exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})

exports.statusSchema = Joi.object({
  status: Joi.string().required(),
  limit: Joi.number().positive().required(),
  page: Joi.number().positive().required(),
})

exports.updateStatusSchema = Joi.object({
  status: Joi.string().required(),

})

exports.searchApplicationSchema = Joi.object({
  tracking_id: Joi.string().required(),

})