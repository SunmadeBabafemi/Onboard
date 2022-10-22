const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const universityService = require('./admin-university.service')

exports.addAUniversityController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.addAUniversity({
            admin_email: req.user.email,
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
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.editAUniversityController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.editUniversity({
            id: req.params.id,
            body: req.body
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
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}


exports.deleteAUniversityController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.deleteUniversity(req.params.id)

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
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}
