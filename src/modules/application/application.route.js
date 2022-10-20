const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    createApplicationController,
    searchApplicationController,
    viewApplicationController
} = require('./application.controller')

const {
    createApplicationSchema,
    modelIdSchema,
    seaerchApplicationSchema
} = require('./application.schema')

const router = Router()

router.post(
    '/create/:id',
    validateRequest(modelIdSchema, 'params'),
    validateRequest(createApplicationSchema, 'body'),
    createApplicationController
)

router.post(
    '/search',
    validateRequest(seaerchApplicationSchema, 'body'),
    searchApplicationController
)

router.get(
    '/view/:id',
    validateRequest(modelIdSchema, 'params'),
    viewApplicationController
)
module.exports = router
