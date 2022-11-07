const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')
const { ImageUploader } = require('../../common/helpers/cloudinaryUpload')

const {
    sequelize,
    University,
    Course,
    Program,
    Review

} = models


exports.getAllUniversities = async (data) => {
        try {
        const {limit, page} = data
        const allUniversities = await getPaginatedRecords(University, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name", "images", "description", "ratings",]
        })
        return {
            error: false,
            message: "Universities retreived successfully",
            data: {
                allUniversities: allUniversities,
                pagination: allUniversities.perPage
            }
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive universities at the moment",
            data: null
        }
        
    }
}


exports.viewUniversity = async (data) => {
    try {
        const{
            id,
            limit,
            page
        } = data
        const university = await University.findOne({
            attributes: [
                "id",
                "images",
                "name",
                "description",
                "ratings",
                "created_at",
                "updated_at"
            ],
            where:{id}
        })
        if(!university){
            return {
                error: true,
                message: "University Not Found",
                data: null
            }
        }

        const allUniversityReviews = await Review.findAll({where: {UniversityId: university.id}})

        const allCoursesOffered = await Course.findAll({where:{UniversityId: university.id}})
        const pagedArray = [...allUniversityReviews, ...allCoursesOffered]
        const paginatedResult = await paginateRaw(pagedArray, {
            limit: Number(limit),
            page: Number(page)
        })
        return {
            error: false,
            message: "University retrieved successfully",
            data: {
                university: university,
                coursesAndReviews: paginatedResult,
                pagination: paginatedResult.perPage
            }
        }
    } catch (error) {
       console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to view UNiversity at the moment",
            data: null
        }
        
    }
}

exports.searchUniversity = async (data) => {
    try {
        const{
            search
        } = data
        const lower = search.toLowerCase()
        const universities = await University.findAll({
           attributes: [
                "id",
                "images",
                "name",
                "description",
                "ratings",
                "created_at",
                "updated_at"
            ],
            where:{name: {[Op.like]: `%${lower}%` }}
        })
        if(universities.length < 1){
            return {
                error: false,
                message: "University Not Found",
                data: []
            }
        }

        return {
            error: false,
            message: "University retrieved successfully",
            data: universities
        }
    } catch (error) {
       console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch univerisites at the moment",
            data: null
        }
        
    }
}