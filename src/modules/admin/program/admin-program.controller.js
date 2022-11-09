const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const ProgramService = require('./admin-program.service')

exports.addAProgramController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProgramService.addAProgram({
            university_id: req.params.id,
            admin_email: req.user.email,
            name: req.body.name,
            description: req.body.description,
            duration: req.body.duration
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

exports.editAProgramController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProgramService.editProgram({
            id: req.params.pg_id,
            university_id: req.params.uni_id,
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
        return createResponse(message, data)(res, HTTP.OK);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.deleteAProgramController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProgramService.deleteProgram({
            id: req.params.pg_id,
            university_id: req.params.uni_id,
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
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

