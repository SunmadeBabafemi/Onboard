const {HTTP} = require('../../../common/constants/http')
const {RESPONSE} = require('../../../common/constants/response')
const createError = require("../../../common/helpers/createError");
const { createResponse } = require("../../../common/helpers/createResponse");
const courseService = require('./admin-course.service')

exports.getAllCoursesInAUniversityController = async(req, res, next) => {
    try {
        const {error, message, data } = await courseService.getAllCoursesInAUniversity({
            limit: req.query.limit,
            page: req.query.page,
            university_id: req.params.id
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

exports.getAllCoursesInAProgramController = async(req, res, next) => {
    try {
        const {error, message, data } = await courseService.getAllCoursesInAProgram({
            limit: req.query.limit,
            page: req.query.page,
            program_id: req.params.id
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

exports.viewOneCourseByIdController = async (req, res, next) => {
    try {
        const {error, message, data} = await courseService.viewOneCourseById({
            id: req.params.id
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

exports.addACourseController = async (req, res, next) => {
    try {
        const {error, message, data} = await courseService.addACourse({
            admin_email: req.user.email,
            university_id: req.params.uni_id,
            program_id: req.params.pg_id,
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

exports.editACourseController = async (req, res, next) => {
    try {
        const {error, message, data} = await courseService.editCourse({
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
        return createResponse(message, data)(res, HTTP.OK);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}


exports.deleteACourseController = async (req, res, next) => {
    try {
        const {error, message, data} = await courseService.deleteCourse(req.params.id)

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
