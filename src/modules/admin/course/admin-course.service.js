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

exports.getAllCoursesInAUniversity = async (payload) => {
    try {
        const {
            limit,
            page,
            university_id
        } = payload
        let paginatedResult
        const allUniversityCourses = await Course.findAll({where:{UniversityId: university_id}})
       
        if(Number(allUniversityCourses.length) < 1) {
            return {
                error: false,
                message: "No courses found for this university",
                data: {
                    courses: [],
                    pagination:  null
                }
            }
        } else {
            paginatedResult = await paginateRaw(
            allUniversityCourses,
                {
                    limit: Number(limit),
                    page: Number(page)
                }
            )
            return {
                error: false,
                message: "All courses retrieved successfully",
                data: {
                    courses: paginatedResult,
                    pagination: paginatedResult.perPage
                }
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve courses at the moment",
            data: null
        }
    }
}

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
            name: String(course_name).toLowerCase(),
            description: String(description).toLowerCase(),
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

exports.viewOneCourseById = async (data) => {
    try {
        const currentDate = new Date
        const {id, } = data
        const singleCourse = await Course.findOne({where:{id}})
        if(!singleCourse){
            return {
                error: true,
                message: "Course not found",
                data: null
            } 
        }
        const available_classes = await Class.findAll({
            attributes: {excludes: ['deleted' ]},
            where: {
                application_closing: {[Op.lt]: currentDate}, 
                CourseId: singleCourse.id,
                active: true
            }
        }) 
        const school = await University.findOne({where:{id:singleCourse.UniversityId}})
        const program_type = await Program.findOne({where: {id: singleCourse.ProgramId}})
        const courseDetails = {
            id: singleCourse.id,
            name: singleCourse.name,
            description: singleCourse.description,
            tuition: singleCourse.tuition,
            duration: singleCourse.duration,
            program: program_type.name,
            available_diet: available_classes,
            university_name: school.name
        }
        return {
            error: false,
            message: "Course retreived successfully",
            data: courseDetails
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message|| "Unable to retreive courses at the moment",
            data: null
        }
        
    }
}