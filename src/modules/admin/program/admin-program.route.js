const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const { 
    addAProgramController,
    editAProgramController,
    deleteAProgramController,
    viewAProgramController,
    viewAllProgramsInAUniversityController,
    viewAllProgramsController
} = require('./admin-program.controller')
const {
    addProgramSchema,
    modelIdSchema,
    uniPgParamsSchema,
    editProgramSchema,
    paginateSchema
  } = require('./admin-program.schema')

const router = Router()

router.post(
    '/:id/create',
    validateRequest(modelIdSchema, "params"),
    validateRequest(addProgramSchema, "body"),
    authorizeAdmin,
    addAProgramController
)

router.get(
    '/view/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    viewAProgramController
)

router.get(
    '/all',
    validateRequest(paginateSchema, "query"),
    authorizeAdmin,
    viewAllProgramsController
)

router.get(
    '/by-uni/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    viewAllProgramsInAUniversityController
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