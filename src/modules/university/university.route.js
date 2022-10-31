const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const {
    getAllUniversitiesController,
    viewAUniversityController,
    addAUniversityController,
} = require('./university.controller')

const {
    paginateSchema,
    modelIdSchema,
    addUniversitySchema
    
} = require('./university.schema')

const router = Router()


router.get(
    '/all',
    validateRequest(paginateSchema, 'query'),
    getAllUniversitiesController
)

router.get(
    '/view/:id',
    validateRequest(paginateSchema, 'query'),
    validateRequest(modelIdSchema, 'params'),
    viewAUniversityController
)

module.exports = router
