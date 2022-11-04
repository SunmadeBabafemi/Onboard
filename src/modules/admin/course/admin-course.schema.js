const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.addCourseParamsSchema = Joi.object().keys({
    uni_id: Joi.string().required(),
    pg_id: Joi.string().required(),
})

exports.addCourseBodySchema = Joi.object().keys({
  course_name: Joi.string().optional(),
  description: Joi.string().optional(),
})


exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})


exports.paginateSchema = Joi.object().keys({
  limit: Joi.number().positive().required(),
  page: Joi.number().positive().required(),

})