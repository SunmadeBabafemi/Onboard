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
    Application

} = models

exports.viewAllApplications = async (data) => {
    try {
        const {limit, page} = data
        const allApplications = await Application.findAll({
            attributes:{excludes:['deleted']}
        })
        if(allApplications.length < 1){
            return {
                error: true,
                message: 'No applications found',
                data: null
            }
        }
        const paginatedResult = await paginateRaw(
            allApplications,
            {
                limit: Number(limit),
                page: Number(page)
            }
        )
        return {
            error: false,
            message: "All Applications retrieved successfully",
            data: {
                applications: paginatedResult.data,
                pagination: paginatedResult.perPage
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve applications at the moment",
            data: null
        }
    }
}

exports.searchApplicationByTrackingId = async (data) => {
    try {
        const {tracking_id} = data   
        const upper = tracking_id.toUpperCase()

        const foundApplication = await Application.findAll({
            where:{
               tracking_id: {[Op.like]: `%${upper}%`},
            }
          })
        if(Number(foundApplication.length) < 1) {
            return {
                error: true,
                message: "No application found with that tracking ID",
                data: null
            }
        }

        return {
            error: false,
            message: "application retrieved successfully",
            data: foundApplication
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch application at the moment",
            data: null
        }
        
    }
}

exports.viewApplication = async (data) => {
        try {
        const {
            id
        } = data


        const foundApplication = await Application.findOne({
            where:{
                id,
            }
          })
        if(!foundApplication) {
            return {
                error: true,
                message: "No application found",
                data: null
            }
        }

        const courseApplied = await Course.findOne({
            where: {id: foundApplication.CourseId}
        })

        const courseProgram = await Program.findOne({
            where: {id: courseApplied.ProgramId}
        })

        const intending_class = await Class.findOne({
            where: {id: foundApplication.ClassId }
        })
        const names = foundApplication?.middle_name?
            foundApplication.first_name + " " + foundApplication.last_name + " " + foundApplication.middle_name:
                foundApplication.first_name + " " + foundApplication.last_name 
        
        const application = {
            id: foundApplication.id,
            names,
            gender: foundApplication.gender,
            email: foundApplication.email,
            admission_status: foundApplication.status,
            application_fees: foundApplication.application_fees,
            intending_course: courseApplied.name,
            course_description: courseApplied.description,
            program: courseProgram.name,
            duration: courseProgram.duration,
            class: intending_class.class_year,
            diet: intending_class.diet,
            class_start_date: intending_class.start_date,
            class_end_date: intending_class.end_date,
            tuition: intending_class.course_tuition,
            application_fees: intending_class.application_fees,
            tracking_id: foundApplication.tracking_id,
            class_diet: foundApplication.class_diet,
            school_name: foundApplication.school_name
        }
        return {
            error: false,
            message: "application retrieved successfully",
            data: application
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch application at the moment",
            data: null
        }
        
    }
}
