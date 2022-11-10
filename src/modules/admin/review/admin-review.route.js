const {Router} = require('express')
const{authorizeSuperAdmin, authorizeAdmin} = require('../../../common/middlewares/authorize')
const validateRequest = require('../../../common/middlewares/validateRequest')
const {
    getallReviewsOfAUniversityController,
    viewAReviewController,
    deleteAReviewController
} = require('./admin-review.controller')
const { 
    modelIdSchema, 
    paginateSchema } = require('./admin-review.schema')

const router = Router()

router.get(
    '/all/:id',
    authorizeAdmin,
    validateRequest(paginateSchema, 'query'),
    validateRequest(modelIdSchema, "params"),
    getallReviewsOfAUniversityController

)

router.get(
    '/view/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    viewAReviewController
)

router.patch(
    '/delete/:id',
    validateRequest(modelIdSchema, "params"),
    authorizeAdmin,
    deleteAReviewController
)


module.exports = router
