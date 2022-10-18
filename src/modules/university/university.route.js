const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const {
    getAllUniversitiesController
} = require('./university.controller')

const {
    getAllUniversitiesSchema
} = require('./university.schema')

const router = Router()

router.get(
    '/all',
    validateRequest(getAllUniversitiesSchema, 'query'),
    getAllUniversitiesController
)

module.exports = router
