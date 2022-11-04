const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin, } = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const { 
    addAClassController,
    editAClassController,
    deleteAClassController,
    viewAClassController,
    getAllClassesOfAcourseController
} = require('./admin-class.controller')
const {
addClassBodySchema,
modelIdSchema,
editClassBodySchema,
paginateSchema
} = require('./admin-class.schema')

const router = Router()

router.post(
    '/:id/create',
    validateRequest(modelIdSchema, "params"),
    validateRequest(addClassBodySchema, "body"),
    authorizeAdmin,
    addAClassController
)

router.patch(
    '/edit/:id',
    validateRequest(modelIdSchema, "params"),
    validateRequest(editClassBodySchema, "body"),
    authorizeAdmin,
    editAClassController
)

router.patch(
    '/delete/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    deleteAClassController
)

router.get(
    '/view/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    viewAClassController
)

router.get(
    '/all-of-course/:id',
    validateRequest(modelIdSchema, "params"),
    validateRequest(paginateSchema, "query"),
    authorizeAdmin,
    getAllClassesOfAcourseController
)

module.exports = router