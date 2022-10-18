const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    createApplicationController
} = require('./application.controller')

const {
    createApplicationSchema,
    modelIdSchema
} = require('./application.schema')

const router = Router()

router.post(
    '/create/:id',
    validateRequest(modelIdSchema, 'params'),
    validateRequest(createApplicationSchema, 'body'),
    createApplicationController
)


module.exports = router
