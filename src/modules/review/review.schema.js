const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);


exports.modelIdSchema = Joi.object({
  id: Joi.string().required(),
})

exports.createIdSchema = Joi.object({
  uni_id: Joi.string().required(),
})

exports.createReviewSchema = Joi.object().keys({
    text: Joi.string().required(),
    rating: Joi.number().optional()
})

exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});