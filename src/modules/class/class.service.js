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


exports.seedClass = async (data) => {
    try {
       const {
        limit,
        page
       } = data
       
        // const enums = ['Winter', 'Summer', 'Spring']
        // const allCourses = await Course.findAll()
        // const allClasses = []
        // for (const course of allCourses){
        //     for (let i = 0; i < enums.length; i++){
        //         const course_class = await Class.create({
        //             class_year: 2022,
        //             class_diet: enums[i],
        //             start_date: new Date(),
        //             end_date: setEndDateByYear(2).toDateString(),
        //             application_opening: new Date().toDateString(),
        //             application_closing: setEndDateByMonth(3).toDateString(),
        //             course_tuition: Math.floor(Math.random() * 10000),
        //             CourseId: course.id
        //         })
        //         allClasses.push(course_class)
        //     }
        // }
        // const paginatedClasses = await paginateRaw(allClasses, {
        //     limit: Number(limit),
        //     page: Number(page)
        // })
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