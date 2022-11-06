const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const {
    getAllUniversitiesController,
    viewAUniversityController,
    addAUniversityController,
    searchUniversityController,
} = require('./university.controller')

const {
    paginateSchema,
    modelIdSchema,
    addUniversitySchema,
    searchSchema
    
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

router.get(
    '/search',
    validateRequest(searchSchema, 'query'),
    searchUniversityController
)

module.exports = router
