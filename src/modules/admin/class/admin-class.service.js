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

exports.addAClass = async (data) => {
    try {
        const {
            class_year,
            class_diet,
            start_date,
            end_date,
            application_fees,
            application_opening,
            application_closing,
            course_tuition,
            course_id,
            admin
        } = data

        const availableCourse = await Course.findOne({where:{id: course_id}})
        if(!availableCourse){
            return {
                error: true,
                message: "Course not found",
                data: null
            }
        }

        const newClass = await Class.create({
            class_year,
            class_diet,
            start_date,
            end_date,
            application_fees,
            application_opening,
            application_closing,
            course_tuition,
            CourseId: course_id,
            added_by: admin.email
        })

        return {
            error: false,
            message: "Class created successfully",
            data: newClass
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to create class at the moment",
            data: null
        }
    }
    
}

exports.editClass = async (data) => {
    try {
        const {id, body } = data
        const singleClass = await Class.findOne({where:{
            id,
            deleted: false
        }})
        if(!singleClass){
            return {
                error: true,
                message: "Class not found",
                data: null
            } 
        }
        await Class.update(
            {
            ...body
            },
            {where:{
                id: singleClass.id,
            }}
        )

        const editedClass = await Class.findOne({where:{id: singleClass.id}})
        return {
            error: false,
            message: "Class edited successfully",
            data: editedClass
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to edit class at the moment",
            data: null
        }
        
    }
}

exports.deleteClass = async (id) => {
    try {
        const singleClass = await Class.findOne({where:{
            id,
            deleted: false
        }})
        if(!singleClass){
            return {
                error: true,
                message: "Class not found",
                data: null
            } 
        }
        await Class.update(
            {
                deleted: true
            },
            {where:{
                id: singleClass.id,
            }}
        )

        return {
            error: false,
            message: "Class deleted successfully",
            data: null
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to delete class at the moment",
            data: null
        }
        
    }
}