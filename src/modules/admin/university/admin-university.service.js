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
            selectedFields:[
                "id",
                "pictures",
                "name",
                "description",
                "address",
                "country",
                "ratings",
                "created_at",
                "updated_at"
            ],
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

exports.searchForUniversity = async (payload) => {
    try {
       const {
        limit,
        page,
        name,
        country
       } = payload
       let foundUniversities = []
       if(name){
            const lower = String(name).toLocaleLowerCase()
            const searchResults = await University.findAll({
                where: {
                    name: { [Op.like]: `%${lower}%` },
                    deleted: false
                },
                raw: true,
            })
            foundUniversities = searchResults
        } 
        if(country) {
            const searchResults = await University.findAll({
                where: {
                    country: { [Op.like]: `%${country}%` },
                    deleted: false
                },
                raw: true,
            })
            foundUniversities = searchResults
        } 
        if (name && country) {
            const lower = String(name).toLocaleLowerCase()
            const searchResults = await University.findAll({
                where: {
                    name: { [Op.like]: `%${lower}%` },
                    country: { [Op.like]: `%${country}%` },
                    deleted: false
                },
                raw: true,
            })
            foundUniversities = searchResults
        }
       
       if(foundUniversities.length <1) {
            return {
                error: false,
                message: "No University Found",
                data: {
                    foundUniversities: [],
                    pagination: 0
                }
            }
       }

       const paginatedResult = await paginateRaw(foundUniversities, {
        limit: Number(limit),
        page: Number(page)
       })

       return {
        error: false,
        message: "Univerisities retreived successfully",
        data: {
            foundUniversities: paginatedResult,
            pagination: paginatedResult.perPage
        }
       }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to return UNiversity at the moment",
            data: null
        }
    }
}

exports.viewUniversity = async (data) => {
    try {
        const{
            id,
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

        return {
            error: false,
            message: "University retrieved successfully",
            data: university
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
            name: String(name).toLowerCase(),
            description: String(description).toLowerCase(),
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
                pictures: imgUrls
            },
            {where: {id: newUni.id}}
        )

    const updatedUni = await University.findOne({
        attributes: [
            "id",
            "pictures",
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
                    pictures: imgUrls
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
                "pictures",
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

