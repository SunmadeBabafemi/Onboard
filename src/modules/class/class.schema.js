const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});

exports.searchCourseSchema = Joi.object({
  school_name: Joi.string().optional(),
  program_name: Joi.string().optional(),
  course_name: Joi.string().optional(),
  country_name: Joi.string().optional(),
  

})

exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})