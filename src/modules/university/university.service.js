const models = require('../../db/models')
var Sequelize = require('sequelize')
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')
const { ImageUploader } = require('../../common/helpers/cloudinaryUpload')

const {
    sequelize,
    University,
    Course,
    Program,
    Review

} = models

exports.addAUniversity = async (payload) => {
    try {
        const {
           name,
           description,
           address,
           country,
           added_by, 
           files
        } = payload
        const existingUni = await University.findOne({
            where: {name, country}
        })
        if(existingUni){
            return {
                error: true,
                message: 'A university with the same name in the same country already exists',
                data: null
            }
        }

        const newUni = await University.create({
            name,
            description,
            address,
            country,
            added_by,
        })
        const imgUrls = []
        for(const file of files) {
            const {path} = file
            const url = await ImageUploader(path)
            imgUrls.push(url)
        }
         await University.update(
            {
                picture: imgUrls[0],
                picture_2: imgUrls[1],
            },
            {where: {id: newUni.id}}
        )

    const updatedUni = await University.findOne({where:{id: newUni.id}})
        return {
            error: false,
            message: "University added successfully",
            data: updatedUni
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to add new university at the moment",
            data: null
        }
    }
}


exports.getAllUniversities = async (data) => {
        try {
        const {limit, page} = data
        const allUniversities = await getPaginatedRecords(University, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ["id", "name", "picture", "description", "ratings",]
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