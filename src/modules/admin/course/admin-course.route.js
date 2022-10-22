const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const {authAdminLogin, } = require('../../../common/middlewares/authorizeLogin')
const validateRequest = require('../../../common/middlewares/validateRequest')
const { 
    addACourseController,
    editACourseController,
    deleteACourseController
} = require('./admin-course.controller')
const {
addCourseBodySchema,
addCourseParamsSchema,
modelIdSchema
} = require('./admin-course.schema')

const router = Router()

router.post(
    '/create/:uni_id/:pg_id',
    validateRequest(addCourseParamsSchema, "params"),
    validateRequest(addCourseBodySchema, "body"),
    authorizeAdmin,
    addACourseController
)

router.patch(
    '/edit/:id',
    validateRequest(modelIdSchema, "params"),
    validateRequest(addCourseBodySchema, "body"),
    authorizeAdmin,
    editACourseController
)

router.patch(
    '/delete/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    deleteACourseController
)

module.exports = router