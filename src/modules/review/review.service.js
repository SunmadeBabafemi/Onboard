const models = require('../../db/models')
var Sequelize = require('sequelize')
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')

const {
    sequelize,
    University,
    Course,
    Program,
    Review

} = models

exports.addAReview = async(data) => {
    try {
        const {
            body,
            user,
            university_id
        } = data
        const review = await Review.create({
            ...body,
            author: user.email,
            UniversityId: university_id
        })

        const result = await Review.findAll({
             attributes: [
                [Sequelize.fn('AVG', Sequelize.cast(Sequelize.col('rating'), 'integer')), 'avgRating']
            ]
        })
        const avgRating = result[0].dataValues.avgRating
        await University.update(
            {ratings: Number(avgRating)},
            {where: {id:university_id}}
        )
        return {
            error: false,
            message: "Review submitted successfully",
            data: {
                review: review,
                averageRating: avgRating
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to create review at the moment",
            data: null
        }
    }
}

exports.getAllReviewOfAUniversity = async(data) => {
    try {
        const {
            limit,
            page,
            id
        } = data
        const allReviews = await Review.findAll({
            attributes:{excludes:['deleted']},
            where:{UniversityId:id}})

        const paginatedResult = await paginateRaw(
            allReviews,
            {limit: Number(limit),
            page: Number(page)}
        )
        return {
            error: false,
            message: "Review submitted successfully",
            data: {
                reviews: paginatedResult,
                pagination: paginatedResult.perPage
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to create review at the moment",
            data: null
        }
    }
}