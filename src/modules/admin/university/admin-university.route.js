const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin, } = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const upload = require('../../../common/config/multer')
const { 
    addAUniversityController,
    editAUniversityController,
    deleteAUniversityController
} = require('./admin-university.controller')
const {
    addUniversitySchema,
    modelIdSchema,
    editUniversitySchema
} = require('./admin-university.schema')

const router = Router()

router.post(
    '/create',
    upload.array('image'),
    // validateRequest(addUniversitySchema, "body"),
    authorizeAdmin,
    addAUniversityController
)

router.patch(
    '/edit/:id',
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