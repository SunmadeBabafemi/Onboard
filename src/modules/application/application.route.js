const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    createApplicationController,
    searchApplicationController,
    viewApplicationController,
    myApplicationsController
} = require('./application.controller')

const {
    createApplicationSchema,
    modelIdSchema,
    paginateSchema,
    seaerchApplicationSchema
} = require('./application.schema')

const router = Router()

router.post(
    '/create/:id',
    authorize(),
    validateRequest(modelIdSchema, 'params'),
    validateRequest(createApplicationSchema, 'body'),
    createApplicationController
)

router.post(
    '/search',
    authorize(),
    validateRequest(seaerchApplicationSchema, 'body'),
    searchApplicationController
)

router.get(
    '/view/:id',
    authorize(),
    validateRequest(modelIdSchema, 'params'),
    viewApplicationController
)

router.get(
    '/all',
    authorize(),
    validateRequest(paginateSchema, 'query'),
    myApplicationsController
)
module.exports = router
