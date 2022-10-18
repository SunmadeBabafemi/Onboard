const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    searchForACourseController,
    seedCoursesController,
    getOneCourseByIdController
} = require('./course.controller')

const {
    paginateSchema,
    searchCourseSchema,
    modelIdSchema
} = require('./course.schema')

const router = Router()

router.post(
    '/search',
    validateRequest(paginateSchema, 'query'),
    // validateRequest(searchCourseSchema, 'body'),
    searchForACourseController
)

router.get(
    '/seed',
    seedCoursesController
)

router.get(
    '/one/:id',
    validateRequest(modelIdSchema, 'params'),
    getOneCourseByIdController
)

module.exports = router
