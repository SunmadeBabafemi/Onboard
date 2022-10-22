const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin, } = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const { 
    addAProgramController,
    editAProgramController,
    deleteAProgramController
} = require('./admin-program.controller')
const {
    addProgramSchema,
    modelIdSchema,
    uniPgParamsSchema,
    editProgramSchema
  } = require('./admin-program.schema')

const router = Router()

router.post(
    '/:id/create',
    validateRequest(modelIdSchema, "params"),
    validateRequest(addProgramSchema, "body"),
    authorizeAdmin,
    addAProgramController
)

router.patch(
    '/edit/:uni_id/:pg_id',
    validateRequest(uniPgParamsSchema, "params"),
    validateRequest(editProgramSchema, "body"),
    authorizeAdmin,
    editAProgramController
)

router.patch(
    '/delete/:uni_id/:pg_id',
    validateRequest(uniPgParamsSchema, "params"),
    authorizeAdmin,
    deleteAProgramController
)

module.exports = router