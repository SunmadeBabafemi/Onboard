const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')
const {courses} = require('../../../db/seeders/courses')
const { ImageUploader } = require('../../../common/helpers/cloudinaryUpload')
const {
    sequelize,
    University,
    Course,
    Program,
    Class,
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

        const allUniversityReviews = await Review.findAll({
            where: {UniversityId: university.id}
        })

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

exports.addAUniversity = async (payload) => {
    try {
        const {
           name,
           description,
           address,
           country,
           admin , 
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
            added_by: admin.email,
        })
        const imgUrls = []
        for(const file of files) {
            const {path} = file
            const url = await ImageUploader(path)
            imgUrls.push(url)
        }
         await University.update(
            {   
                images: imgUrls
            },
            {where: {id: newUni.id}}
        )

    const updatedUni = await University.findOne({
        attributes: [
            "id",
            "images",
            "name",
            "description",
            "ratings",
            "created_at",
            "updated_at"
        ],
        where:{id: newUni.id}
    })
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

exports.editUniversity = async (data) => {
    try {
        const {id, body, files } = data
        const singleUniversity = await University.findOne({where:{
            id,
            deleted: false
        }})
        if(!singleUniversity){
            return {
                error: true,
                message: "UNiversity not found",
                data: null
            } 
        }
        const imgUrls = []
        for(const file of files) {
                const {path} = file
                const url = await ImageUploader(path)
                imgUrls.push(url)
            }
        if(imgUrls.length > 0){
            await University.update(
                {
                    images: imgUrls
                },
                {where: {id: singleUniversity.id}}
            )
        }

        await University.update(
            {
            ...body
            },
            {where:{
                id: singleUniversity.id,
            }}
        )
        
        const editedUniversity = await University.findOne({
            attributes: [
                "id",
                "images",
                "name",
                "description",
                "ratings",
                "created_at",
                "updated_at"
            ],
            where:{id: singleUniversity.id}
        })
        return {
            error: false,
            message: "University edited successfully",
            data: editedUniversity
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to edit university at the moment",
            data: null
        }
        
    }
}

exports.deleteUniversity = async (id) => {
    try {
        const singleUniversity = await University.findOne({where:{
            id,
            deleted: false
        }})
        if(!singleUniversity){
            return {
                error: true,
                message: "University not found",
                data: null
            } 
        }
        await University.update(
            {
                deleted: true
            },
            {where:{
                id: singleUniversity.id,
            }}
        )

        return {
            error: false,
            message: "University deleted successfully",
            data: null
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to delete university at the moment",
            data: null
        }
        
    }
}

