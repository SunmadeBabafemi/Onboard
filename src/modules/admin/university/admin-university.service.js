const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')
const {courses} = require('../../../db/seeders/courses')
const {
    sequelize,
    University,
    Course,
    Program,
    Class

} = models

exports.addAUniversity = async (data) => {
    try {
        const {
            admin_email,
            country,
            name,
            description,
        } = data

        const existingUniversity = await University.findOne({where:{
            name,
            country,
            deleted: false
        }})

        if(existingUniversity){
            return {
                error: true,
                message: "A University with the same name already created",
                data: null
            }
        }

        const newUniversity = await University.create({
            name,
            description,
            country,
            added_by: admin_email,
        })

        return {
            error: false,
            message: "University created successfully",
            data: newUniversity
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to create university at the moment",
            data: null
        }
    }
   
}

exports.editUniversity = async (data) => {
    try {
        const {id, body } = data
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
        await University.update(
            {
            ...body
            },
            {where:{
                id: singleUniversity.id,
            }}
        )

        const editedUniversity = await University.findOne({where:{id: singleUniversity.id}})
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