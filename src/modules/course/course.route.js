const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    seedCoursesController,
    getOneCourseByIdController,
    getCoursesController,
    getCoursesInAUniversityController,
    editAllCoursesController,
    editAllProgramsController,
    bigSearchForACourseController,
    searchForACourseUnderAUniversityController,
    getCoursesInAProgramController
} = require('./course.controller')

const {
    paginateSchema,
    searchCourseSchema,
    modelIdSchema
} = require('./course.schema')

const router = Router()

router.get(
    '/big-search',
    // validateRequest(searchCourseSchema, 'query'),
    bigSearchForACourseController
)

router.get(
    '/search/:id',
    validateRequest(searchCourseSchema, 'query'),
    validateRequest(modelIdSchema, 'params'),
    searchForACourseUnderAUniversityController
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

router.get(
    '/by-program/:id',
    validateRequest(paginateSchema, 'query'),
    validateRequest(modelIdSchema, 'params'),
    getCoursesInAProgramController
)

router.patch(
    '/auto-edit',
    validateRequest(paginateSchema, 'query'),
    editAllCoursesController
)

router.patch(
    '/auto-edit-programs',
    validateRequest(paginateSchema, 'query'),
    editAllProgramsController
)


module.exports = router
