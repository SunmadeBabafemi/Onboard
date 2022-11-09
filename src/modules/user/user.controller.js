const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const UserService = require('./user.service')

exports.registerUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.registerUser({
            ...req.body
        })

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                    data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.googleUserAuthController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.getGoogleAuth()

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                    data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}


exports.completeSignupController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.completeSignup(req.body.otp)

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                    data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.loginUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.loginUser(req.user,req.body)

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.logoutUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.logoutUser(req.token)

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}


exports.editUserProfileController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.editUserProfile({
            user_id: req.userId,
            body: req.body,
            file: req.file
        })

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}


exports.forgotPasswordController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.forgotPassword(req.body)

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.resetPasswordController = async (req, res, next) => {
    try {
        const {error, message, data} = await UserService.resetPassword(req.body)

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}