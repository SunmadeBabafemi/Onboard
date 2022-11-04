const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const ClassService = require('./admin-class.service')

exports.addAClassController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.addAClass({
            class_year: req.body.class_year,
            class_diet: req.body.class_diet,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            application_fees: req.body.application_fees,
            application_opening: req.body.application_opening,
            application_closing: req.body.application_closing,
            course_tuition: req.body.course_tuition,
            course_id: req.params.id,
            admin: req.user
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

exports.editAClassController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.editClass({
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


exports.deleteAClassController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.deleteClass(req.params.id)

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


exports.viewAClassController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.viewAClass(req.params.id)

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

exports.getAllClassesOfAcourseController = async (req, res, next) => {
    try {
        const {error, message, data} = await ClassService.getAllClassesOfACourse({
           limit: req.query.limit,
           page: req.query.page,
           course_id: req.params.id 
        })
        const allData = {
            allClasses: data.classes,
            pagination: data.pagination
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
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}