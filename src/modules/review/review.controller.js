const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const ReviewService = require('./review.service')


exports.addAReviewController = async(req, res, next) => {
    try {
        const {error, message, data } = await ReviewService.addAReview({
            body: req.body,
            user: req.user,
            university_id: req.params.uni_id
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

exports.getallReviewsOfAUniversityController = async(req, res, next) => {
    try {
        const {error, message, data } = await ReviewService.getAllReviewOfAUniversity({
            limit: req.query.limit,
            page: req.query.page,
            id: req.params.id
        })

        const allData ={
            result: data.reviews,
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
        return createResponse(message, allData)(res, HTTP.OK);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}