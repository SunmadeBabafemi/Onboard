const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin, } = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const upload = require('../../../common/config/multer')
const { 
    getAllApplicationsController,
    searchApplicationController,
    viewApplicationController
} = require('./admin-application.controller')
const {
    paginateSchema,
    searchApplicationSchema,
    modelIdSchema
} = require('./admin-application.schema')

const router = Router()

router.get(
    '/all',
    validateRequest(paginateSchema, "query"),
    authorizeAdmin,
    getAllApplicationsController
)

router.get(
    '/search',
    authorizeAdmin,
    validateRequest(searchApplicationSchema, 'query'),
    searchApplicationController
)

router.get(
    '/view/:id',
    authorizeAdmin,
    validateRequest(modelIdSchema, 'params'),
    viewApplicationController
)

module.exports = router