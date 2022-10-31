const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.addCourseParamsSchema = Joi.object().keys({
    uni_id: Joi.string().required(),
    pg_id: Joi.string().required(),
})

exports.addClassBodySchema = Joi.object().keys({
  class_year: Joi.number().positive().required(),
  class_diet: Joi.string().trim().valid("Winter", 'Summer', 'Spring').required(),
  start_date:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  end_date:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  application_opening:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  application_closing:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .required(),
  course_tuition: Joi.number().positive().required(),
  application_fees: Joi.number().positive().required(),

})

exports.editClassBodySchema = Joi.object().keys({
  class_year: Joi.number().positive().optional(),
  class_diet: Joi.string().trim().valid("Winter", 'Summer', 'Spring').optional(),
  start_date:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  end_date:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  application_opening:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  application_closing:  Joi.date()
    .format(["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"])
    .utc()
    .optional(),
  course_tuition: Joi.number().positive().optional(),
  application_fees: Joi.number().positive().optional(),

})


exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})
