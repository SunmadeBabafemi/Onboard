const {Router} = require('express')
const { authorize, authorizeMerchant } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const {
    createApplicationController,
    searchApplicationController,
    viewApplicationController,
    myApplicationsController,
    uploadResultController
} = require('./application.controller')

const {
    createApplicationSchema,
    modelIdSchema,
    paginateSchema,
    seaerchApplicationSchema,
    applicationIdSchema,
    viewApplicationSchema
} = require('./application.schema')

const router = Router()

router.post(
    '/create/:course_id/:class_id',
    authorize(),
    upload.single('result'),
    validateRequest(applicationIdSchema, 'params'),
    // validateRequest(createApplicationSchema, 'body'),
    createApplicationController
)


router.post(
    '/search',
    // authorize(),
    validateRequest(seaerchApplicationSchema, 'body'),
    searchApplicationController
)

router.post(
    '/view/:id',
    // authorize(),
    validateRequest(modelIdSchema, 'params'),
    validateRequest(viewApplicationSchema, 'body'),
    viewApplicationController
)

router.get(
    '/all',
    authorize(),
    validateRequest(paginateSchema, 'query'),
    myApplicationsController
)
module.exports = router
