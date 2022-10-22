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

exports.addACourse = async (data) => {
    try {
        const {
            admin_email,
            university_id,
            course_name,
            description,
            program_id
        } = data

        const foundUniversity = await University.findOne({where:{
            id: university_id,
            deleted: false
        }})

        if(!foundUniversity){
            return {
                error: true,
                message: "University Not Found",
                data: null
            }
        }
        const availableProgram = await Program.findOne({
            where:{
                id: program_id,
                UniversityId: foundUniversity.id,
                deleted: false
            }
        })

        if(!availableProgram){
            return {
                error: true,
                message: "program  not available for this university",
                data: null
            }
        }

        const existingCourse = await Course.findOne({
            where:{
                name: course_name,
                ProgramId: availableProgram.id,
                UniversityId: foundUniversity.id,
                deleted: false
            }
        })
        if(existingCourse){
            return {
                error: true,
                message: "A course with that name already exists in this selected School",
                data: null
            }
        }

        const newCourse = await Course.create({
            name: course_name,
            description,
            added_by: admin_email,
            ProgramId: availableProgram.id,
            UniversityId: foundUniversity.id
        })

        return {
            error: false,
            message: "Course created successfully",
            data: newCourse
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to create course at the moment",
            data: null
        }
    }
    
}

exports.editCourse = async (data) => {
    try {
        const {id, body } = data
        const singleCourse = await Course.findOne({where:{
            id,
            deleted: false
        }})
        if(!singleCourse){
            return {
                error: true,
                message: "Course not found",
                data: null
            } 
        }
        await Course.update(
            {
            ...body
            },
            {where:{
                id: singleCourse.id,
            }}
        )

        const editedCourse = await Course.findOne({where:{id: singleCourse.id}})
        return {
            error: false,
            message: "Course edited successfully",
            data: editedCourse
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to edit courses at the moment",
            data: null
        }
        
    }
}

exports.deleteCourse = async (id) => {
    try {
        const singleCourse = await Course.findOne({where:{
            id,
            deleted: false
        }})
        if(!singleCourse){
            return {
                error: true,
                message: "Course not found",
                data: null
            } 
        }
        await Course.update(
            {
                deleted: true
            },
            {where:{
                id: singleCourse.id,
            }}
        )

        return {
            error: false,
            message: "Course deleted successfully",
            data: null
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to delete courses at the moment",
            data: null
        }
        
    }
}