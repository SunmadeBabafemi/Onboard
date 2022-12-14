const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    seedClassesController,
    getallClassesController,
    viewAClassController,
    editAllClassesController
} = require('./class.controller')

const {
    paginateSchema,
    searchCourseSchema,
    modelIdSchema
} = require('./class.schema')

const router = Router()


router.get(
    '/view/:id',
    validateRequest(modelIdSchema, 'params'),
    viewAClassController
)

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

router.patch(
    '/edit-all',
    validateRequest(paginateSchema, 'query'),
    editAllClassesController
)
module.exports = router
