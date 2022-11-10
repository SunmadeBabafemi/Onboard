const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')

const {
    Review

} = models



exports.getAllReviewOfAUniversity = async(data) => {
    try {
        const {
            limit,
            page,
            id
        } = data
        const allReviews = await Review.findAll({
            where:{
                UniversityId:id,
                deleted: false
            }
        })
        
        if(allReviews.length <1){
            return {
                error: false,
                message: "No reviews Yet",
                data: {
                    reviews: [],
                    pagination: 0,
                    total_reviews: 0
                }
            }
        }
        const paginatedResult = await paginateRaw(
            allReviews,
            {limit: Number(limit),
            page: Number(page)}
        )
        return {
            error: false,
            message: "Reviews retrieved successfully",
            data: {
                reviews: paginatedResult,
                pagination: paginatedResult.perPage,
                total_reviews: allReviews.length
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve review at the moment",
            data: null
        }
    }
}

exports.viewAReviewOfAUniversity = async(data) => {
    try {
        const {
            id
        } = data
        const review = await Review.findOne({
            where:{
                id,
                deleted: false
            }
        })
        
        if(!review){
            return {
                error: true,
                message: "Review Not found",
                data: null
            }
        }

        return {
            error: false,
            message: "Review retrieved successfully",
            data: review
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve review at the moment",
            data: null
        }
    }
}

exports.deleteAReviewOfAUniversity = async(data) => {
    try {
        const {
            id
        } = data
        const review = await Review.findOne({
            where:{
                id,
                deleted: false
            }})
        
        if(!review){
            return {
                error: true,
                message: "Review Not found",
                data: null
            }
        }
        await Review.update(
            {deleted: true},
            {where:{id}}
        )
        
        return {
            error: false,
            message: "Review deleted successfully",
            data: null
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to delete review at the moment",
            data: null
        }
    }
}