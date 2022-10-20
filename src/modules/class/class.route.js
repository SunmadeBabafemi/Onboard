const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    seedClassesController,
    getallClassesController
} = require('./class.controller')

const {
    paginateSchema,
    searchCourseSchema,
    modelIdSchema
} = require('./class.schema')

const router = Router()

// router.post(
//     '/search',
//     validateRequest(paginateSchema, 'query'),
//     // validateRequest(searchCourseSchema, 'body'),
//     searchForACourseController
// )

router.get(
    '/seed',
    validateRequest(paginateSchema, 'query'),
    seedClassesController
)

router.get(
    '/all',
    validateRequest(paginateSchema, 'query'),
    getallClassesController
)
module.exports = router
