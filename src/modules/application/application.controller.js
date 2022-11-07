const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const ApplicationService = require('./application.service')


exports.createApplicationController = async (req, res, next) => {
    try {
        const {error, message, data} = await ApplicationService.createApplication({
            course_id: req.params.course_id,
            class_id:req.params.class_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            nationality: req.body.nationality,
            gender: req.body.gender,
            user_id: req.userId,
            result: req.file
        })
        // console.log("files>>>>>>>>>>>", req.file);
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


exports.searchApplicationController = async (req, res, next) => {
    try {
        const {error, message, data} = await ApplicationService.searchApplicationByTrackingId({
            user_id: req.userId,    
            tracking_id: req.body.tracking_id
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

exports.viewApplicationController = async (req, res, next) => {
    try {
        const {error, message, data} = await ApplicationService.viewApplication({
            id: req.params.id,
            access_code: req.body.access_code
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

exports.myApplicationsController = async (req, res, next) => {
    try {
        const {error, message, data} = await ApplicationService.myApplications({
            limit: req.query.limit,
            page: req.query.page,
            user_id: req.userId
        })
        const allData = {
            allMyApplications: data.allMyApplications,
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
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

