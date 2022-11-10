const {Router} = require('express')
const { authorize, } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    addAReviewController, getallReviewsOfAUniversityController
} = require('./review.controller')
const { createReviewSchema, createIdSchema, modelIdSchema, paginateSchema } = require('./review.schema')

const router = Router()

router.post(
    '/new/:uni_id',
    authorize(),
    validateRequest(createReviewSchema, 'body'),
    validateRequest(createIdSchema, "params"),
    addAReviewController

)

router.get(
    '/all/:id',
    validateRequest(paginateSchema, 'query'),
    validateRequest(modelIdSchema, "params"),
    getallReviewsOfAUniversityController

)

module.exports = router
