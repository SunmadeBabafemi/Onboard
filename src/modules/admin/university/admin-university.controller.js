const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const universityService = require('./admin-university.service')


exports.getAllUniversitiesController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.getAllUniversities({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            universities: data.allUniversities
        }

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
        return createResponse(message, allData)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.searchUniversitiesController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.searchForUniversity({
            limit: req.query.limit,
            page: req.query.page,
            name: req.query.name,
            country: req.query.country
        })
        const allData = {
            pagination: data.pagination,
            universities: data.foundUniversities
        }

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
        return createResponse(message, allData)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.viewAUniversityController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.viewUniversity({
            id: req.params.id,
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


exports.addAUniversityController = async(req, res, next) => {
    try {
        const {error, message, data } = await universityService.addAUniversity({
            admin: req.user,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            country: req.body.country,
            admin: req.user,
            files: req.files
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

exports.editAUniversityController = async (req, res, next) => {
    try {
        const {error, message, data} = await universityService.editUniversity({
            id: req.params.id,
            body: req.body,
            files: req.files
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
        return createResponse(message, data)(res, HTTP.OK);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}
