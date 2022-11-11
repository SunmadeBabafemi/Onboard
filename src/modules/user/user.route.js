const {Router} = require('express')
const { authorizeLogin } = require('../../common/middlewares/authorizeLogin')
const {authorize} = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 registerUserController,
 loginUserController,
 logoutUserController,
 completeSignupController,
 forgotPasswordController,
 resetPasswordController,
 googleUserAuthController,
 editUserProfileController,
 viewUserProfileController
} = require('./user.controller')
const {
 registerUserSchema,
 loginUserSchema,
 forgotPasswordSchema,
 resetPasswordSchema,
 verifyUserSchema,
 editUserProfileSchema
} = require('./user.schema')
const upload = require('../../common/config/multer')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerUserSchema, "body"),
    registerUserController
)

router.get(
    '/google/url',
    googleUserAuthController
)

router.post(
    '/signup/confirm',
    validateRequest(verifyUserSchema, "body"),
    completeSignupController
)

router.post(
    '/login',
    validateRequest(loginUserSchema, "body"),
    authorizeLogin,
    loginUserController
)

router.get(
    '/view-profile',
    authorize(),
    viewUserProfileController
)

router.get(
    '/logout',
    authorize(),
    logoutUserController
)

router.patch(
    '/edit',
    upload.single('image'),
    authorize(),
    validateRequest(editUserProfileSchema, "body"),
    editUserProfileController
)

// router.post(
//     '/pass/forgot',
//     validateRequest(forgotPasswordSchema, "body"),
//     forgotPasswordController
// )

// router.post(
//     '/pass/reset',
//     validateRequest(resetPasswordSchema, "body"),
//     resetPasswordController
// )

module.exports = router