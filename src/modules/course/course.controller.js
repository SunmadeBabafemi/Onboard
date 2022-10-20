const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const CourseService = require('./course.service')


exports.getOneCourseByIdController = async (req, res, next) => {
    try {
        const {error, message, data} = await CourseService.getOneCourseById({
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
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}



exports.searchForACourseController = async (req, res, next) => {
    try {
        const {error, message, data} = await CourseService.seachForCourse({
            limit: req.query.limit,
            page: req.query.page,
            school_name: req.body.school_name,
            program_name: req.body.program_name,
            course_name: req.body.course_name,
            country_name: req.body.country_name
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


// exports.seedCoursesController = async (req, res, next) => {
//     try {
//         const {error, message, data} = await CourseService.seedCourses()
//         // const allData = {
//         //     pagination: data.pagination,
//         //     courses: data.foundResults
//         // }

//         if (error) {
//         return next(
//             createError(HTTP.BAD_REQUEST, [
//             {
//                 status: RESPONSE.ERROR,
//                 message,
//                 statusCode:
//                 data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
//                 data,
//             },
//             ])
//         );
//         }
//         return createResponse(message, data)(res, HTTP.CREATED);
//     } catch (error) {
//         console.error(error);

//         return next(createError.InternalServerError(error));
//     }
// }

exports.getCoursesController = async (req, res, next) => {
    try {
        const {error, message, data} = await CourseService.getallCourses({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            courses: data.allCourses
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

exports.getCoursesInAUniversityController = async (req, res, next) => {
    try {
        const {error, message, data} = await CourseService.getallCoursesByUniversity({
            id: req.params.id,
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            courses: data.allCourses
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