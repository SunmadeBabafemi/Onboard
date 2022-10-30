const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const upload = require('express-fileupload')
const randomString = require('../../common/helpers/randString')
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')
const { FileUploader } = require('../../common/helpers/cloudinaryUpload')
const {
    sequelize,
    University,
    Course,
    Program,
    Class,
    Application,

} = models


exports.createApplication = async (data) => {
        try {
        const {
            first_name,
            course_id,
            class_id,
            last_name, 
            phone_number,
            email,
            nationality,
            gender,
            user_id,
            result,
        } = data
        // fetch url for result upload
        const {path} = result
        const url = await FileUploader(path)


        const intendingCourse = await Course.findOne({
            where:{id: course_id}
        })
        if(!intendingCourse){
            return {
                error: true,
                message: "Course not found",
                data: null
            }
        }
        const intendingClass = await Class.findOne({where:{id: class_id}})
        
        const alreadyApplied = await Application.findOne({
            where:{
                email,
                CourseId: intendingCourse.id,
                ClassId: class_id
            }
        })
        if(alreadyApplied){
            return {
                error: true,
                message: "Already applied for the course"
            }
        }

        const application = await Application.create({
            first_name,
            last_name,
            phone_number,
            email,
            nationality,
            gender,
            tracking_id: 'APL'+ randomString(),
            application_fees: intendingClass.application_fees,
            class_diet: intendingClass.class_diet,
            CourseId: intendingCourse.id,
            ClassId: class_id,
            user_id,
            result: url
        })
        

        return {
            error: false,
            message: "application initiated, proceed to neccessary payment",
            data: application,
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to create application at the moment",
            data: null
        }
        
    }
}



exports.searchApplicationByTrackingId = async (data) => {
    try {
        const {tracking_id, user_id} = data   
        const upper = tracking_id.toUpperCase()

        const foundApplication = await Application.findAll({
            where:{
               tracking_id: {[Op.like]: `%${upper}%`},
               user_id
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
            user_id,
            id
        } = data


        const foundApplication = await Application.findOne({
            where:{
                id,
                user_id
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
            class_diet: foundApplication.class_diet
            
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


exports.myApplications = async (data) => {
        try {
        const {
            limit,
            page,
            user_id,
        } = data
        let myApplications = []

        const foundApplications = await Application.findAll({
            where:{
                user_id
            }
          })
        if(foundApplications.length < 1) {
            return {
                error: true,
                message: "No applications found",
                data: null
            }
        }
        for (const foundApplication of foundApplications){
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
                tracking_id: foundApplication.tracking_id
                
            }
            myApplications.push(application)
        }
        const paginatedResults = await paginateRaw(
            myApplications,
            {
                limit: Number(limit),
                page: Number(page)
            }
        )
        return {
            error: false,
            message: "application retrieved successfully",
            data: {
                pagination: paginatedResults.perPage,
                allMyApplications: paginatedResults
            }
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