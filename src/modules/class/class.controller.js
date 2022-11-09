const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const ClassService = require('./class.service')


exports.viewAClassController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.viewClass(req.params.id)

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


exports.seedClassesController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.seedClass({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            courses: data.foundResults
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
        return createResponse(message, allData)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}


exports.getallClassesController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.getallClasses({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            courses: data.allClasses
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

exports.editAllClassesController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.editAllClasses({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            courses: data.allClasses
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