const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const {getPaginatedRecords, paginateRaw} = require('../../../common/helpers/paginate')
const {
    sequelize,
    University,
    Course,
    Program,
    Class

} = models

exports.addAProgram = async (data) => {
    try {
        const {
            admin_email,
            name,
            description,
            duration,
            university_id,
        } = data

        const existingUniversity = await University.findOne({where:{
            id: university_id,
            deleted: false
        }})

        if(!existingUniversity){
            return {
                error: true,
                message: "University Not Found",
                data: null
            }
        }
        const existingProgram = await Program.findOne({
            where:{ 
                name, 
                UniversityId: existingUniversity.id, 
                deleted: false
            }
        })

        if(existingProgram){
            return {
                error: true,
                message: "A program with this name under this university already exist",
                data: null
            }
        }
        const newProgram = await Program.create({
            name: String(name).toLowerCase(),
            description: String(description).toLowerCase(),
            duration,
            UniversityId: existingUniversity.id,
            added_by: admin_email,
        })

        return {
            error: false,
            message: "Program created for this university successfully",
            data: newProgram
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to create program at the moment",
            data: null
        }
    }
   
}


exports.viewAProgram = async (data) => {
    try {
        const {program_id} = data
        const existingProgram = await Program.findOne({where:{id:program_id}})
        if(!existingProgram){
            return {
                error: true,
                message: "Program Not Found",
                data: null
            }
        }

        return {
            error: false,
            message: "Program retreived successfully",
            data: existingProgram
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve program at the moment",
            data: null
        }
    }
}

exports.viewAllProgramInAUniversity = async (data) => {
    try {
        const {university_id} = data
        const existingPrograms = await Program.findAll({
            where:{UniversityId:university_id}
        })
        if(existingPrograms <1){
            return {
                error: false,
                message: "Program Not Found",
                data: []
            }
        }

        return {
            error: false,
            message: "Program retreived successfully",
            data: existingPrograms
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve program at the moment",
            data: null
        }
    }
}

exports.editProgram = async (data) => {
    try {
        const {
            id,
            body,
            university_id,
        } = data

        const existingUniversity = await University.findOne({where:{
            id: university_id,
            deleted: false
        }})

        if(!existingUniversity){
            return {
                error: true,
                message: "University Not Found",
                data: null
            }
        }
        const existingProgram = await Program.findOne({
            where:{ 
                id, 
                UniversityId: existingUniversity.id, 
                deleted: false
            }
        })

        if(!existingProgram){
            return {
                error: true,
                message: "Program not found",
                data: null
            }
        }
        await Program.update(
            {
            ...body
            },
            {where:{
                id: existingProgram.id,
                UniversityId: existingUniversity.id,
                deleted: false
            }}
        )

        const editedProgram = await Program.findOne({where:{id: existingProgram.id}})
        return {
            error: false,
            message: "Program edited successfully",
            data: editedProgram
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to edit program at the moment",
            data: null
        }
        
    }
}

exports.deleteProgram = async (data) => {
    try {
        const {
            id, university_id
        } = data
        const singleUniversity = await University.findOne({where:{
            id: university_id,
            deleted: false
        }})
        if(!singleUniversity){
            return {
                error: true,
                message: "University not found",
                data: null
            } 
        }
        const existingProgram = await Program.findOne({
            where:{ 
                id, 
                UniversityId: singleUniversity.id, 
                deleted: false
            }
        })

        if(!existingProgram){
            return {
                error: true,
                message: "Program not found",
                data: null
            }
        }
        await Program.update(
            {
            deleted: true
            },
            {where:{
                id: existingProgram.id,
                UniversityId: singleUniversity.id,
                deleted: false
            }}
        )

        return {
            error: false,
            message: "Program deleted successfully",
            data: null
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to delete program at the moment",
            data: null
        }
        
    }
}