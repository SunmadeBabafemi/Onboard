const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    searchForACourseController,
    seedCoursesController,
    getOneCourseByIdController,
    getCoursesController,
    getCoursesInAUniversityController
} = require('./course.controller')

const {
    paginateSchema,
    searchCourseSchema,
    modelIdSchema
} = require('./course.schema')

const router = Router()

router.get(
    '/search',
    validateRequest(searchCourseSchema, 'query'),
    searchForACourseController
)

router.get(
    '/seed',
    validateRequest(paginateSchema, 'query'),
    seedCoursesController
)

router.get(
    '/one/:id',
    validateRequest(modelIdSchema, 'params'),
    getOneCourseByIdController
)

router.get(
    '/all',
    validateRequest(paginateSchema, 'query'),
    getCoursesController
)
router.get(
    '/by-sch/:id',
    validateRequest(paginateSchema, 'query'),
    validateRequest(modelIdSchema, 'params'),
    getCoursesInAUniversityController
)

module.exports = router
