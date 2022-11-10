const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin, } = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const upload = require('../../../common/config/multer')
const { 
    addAUniversityController,
    editAUniversityController,
    deleteAUniversityController,
    getAllUniversitiesController,
    viewAUniversityController,
    searchUniversitiesController
} = require('./admin-university.controller')
const {
    addUniversitySchema,
    modelIdSchema,
    editUniversitySchema,
    paginateSchema,
    searchSchema
} = require('./admin-university.schema')

const router = Router()

router.get(
    '/all',
    validateRequest(paginateSchema, 'query'),
    authorizeAdmin,
    getAllUniversitiesController
)

router.get(
    '/search',
    // validateRequest(searchSchema, 'query'),
    authorizeAdmin,
    searchUniversitiesController
)

router.get(
    '/view/:id',
    validateRequest(paginateSchema, 'query'),
    validateRequest(modelIdSchema, 'params'),
    authorizeAdmin,
    viewAUniversityController

)

router.post(
    '/create',
    upload.array('image'),
    // validateRequest(addUniversitySchema, "body"),
    authorizeAdmin,
    addAUniversityController
)

router.patch(
    '/edit/:id',
    upload.array('image'),
    validateRequest(modelIdSchema, "params"),
    validateRequest(editUniversitySchema, "body"),
    authorizeAdmin,
    editAUniversityController
)

router.patch(
    '/delete/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    deleteAUniversityController
)

module.exports = router