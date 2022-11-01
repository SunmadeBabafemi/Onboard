const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const ApplicationService = require('./admin-application.service')

exports.getAllApplicationsController = async(req, res, next) => {
    try {
        const {error, message, data } = await ApplicationService.viewAllApplications({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            allApplications: data.applications,
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

exports.searchApplicationController = async (req, res, next) => {
    try {
        const {error, message, data} = await ApplicationService.searchApplicationByTrackingId({
            tracking_id: req.query.tracking_id
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