const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const {
    createApplicationController,
    searchApplicationController,
    viewApplicationController,
    myApplicationsController
} = require('./application.controller')

const {
    createApplicationSchema,
    modelIdSchema,
    paginateSchema,
    seaerchApplicationSchema,
    applicationIdSchema
} = require('./application.schema')

const router = Router()

router.post(
    '/create/:course_id/:class_id',
    authorize(),
    validateRequest(applicationIdSchema, 'params'),
    validateRequest(createApplicationSchema, 'body'),
    createApplicationController
)

router.patch(
    '/upload/:id',
    authorize(),
    upload.single('result'),
    validateRequest(modelIdSchema, 'params'),
    viewApplicationController
)

router.post(
    '/search',
    authorize(),
    validateRequest(seaerchApplicationSchema, 'body'),
    searchApplicationController
)

router.get(
    '/view/:id',
    authorize(),
    validateRequest(modelIdSchema, 'params'),
    viewApplicationController
)

router.get(
    '/all',
    authorize(),
    validateRequest(paginateSchema, 'query'),
    myApplicationsController
)
module.exports = router
