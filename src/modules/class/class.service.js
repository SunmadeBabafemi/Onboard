const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')
const {courses} = require('../../db/seeders/courses')
const { setEndDateByYear, setEndDateByMonth } = require('../../common/helpers/deliveryDate')
const {
    sequelize,
    University,
    Course,
    Program,
    Class

} = models

exports.viewClass = async (id) => {
    try {
        const viewedClass = await Class.findOne({where:{id}})
        if(!viewedClass){
            return {
                error: true,
                message: "Class not found",
                data: null
            }
        }
        const course = await Course.findOne({where:{id: viewedClass.CourseId}})
        const program = await Program.findOne({where:{id: course.ProgramId}})
        const school = await University.findOne({where:{id:course.UniversityId}})
        const classData = {
            class_diet : viewedClass.class_diet,
            class_year : viewedClass.class_year,
            start_date: viewedClass.start_date,
            end_date: viewedClass.end_date,
            status: viewedClass.active,
            application_opening: viewedClass.application_opening,
            application_closing: viewedClass.application_closing,
            application_fees: viewedClass.application_fees,
            course_tuiton: viewedClass.course_tuition,
            course_name: course.name,
            program_type: program.name,
            school_name: school.name

        }

        return {
            error: false,
            message: "Class retrieved successfully",
            data: classData
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Unable to retrieve class at the moment",
            data: null
        }
    }
}
exports.seedClass = async (data) => {
    try {
       const {
        limit,
        page
       } = data
       
        const enums = ['Winter', 'Summer', 'Spring']
        const allCourses = await Course.findAll()
        const allClasses = []
        for (const course of allCourses){
            for (let i = 0; i < enums.length; i++){
                const course_class = await Class.create({
                    class_year: 2022,
                    class_diet: enums[i],
                    start_date: new Date(),
                    end_date: setEndDateByYear(2).toDateString(),
                    application_opening: new Date().toDateString(),
                    application_closing: setEndDateByMonth(3).toDateString(),
                    course_tuition: Math.floor(Math.random() * 10000),
                    CourseId: course.id
                })
                allClasses.push(course_class)
            }
        }
        const paginatedClasses = await paginateRaw(allClasses, {
            limit: Number(limit),
            page: Number(page)
        })
        return {
            error: false,
            message: "classes seeded successfully",
            data: {
                foundResults: paginatedClasses,
                pagination: paginatedClasses.perPage
            }
            // data: allClasses
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

exports.getallClasses = async(data)=>{
    try {
        const {
            limit,
            page
        } = data
        const allClasses = await getPaginatedRecords(Class, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ['id', 'class_year', 'class_diet', 'start_date', 'end_date', 'CourseId']
        })
        return {
            error: false,
            message: "All classes retreived successfully",
            data: {
                allClasses: allClasses,
                pagination: allClasses.perPage
            }
        }
        
    } catch (error) {
       console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retreive courses at the moment",
            data: null
        } 
    }
   
}