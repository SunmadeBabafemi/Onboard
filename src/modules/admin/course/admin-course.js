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
    const {
        university_id,
        course_name,
        tuition,
        duration,
        program_id
    } = data

    const foundUniversity = await University.findOne({where:{id: university_id}})

    if(!foundUniversity){
        return {
            error: true,
            message: "University Not Found",
            data: null
        }
    }
    const existingCourse = await Course.findOne({
        where:{
            name: course_name,
            UniversityId: foundUniversity.id
        }
    })
    if(existingCourse){
        return {
            error: true,
            message: "A course with that name already exists in this selected School",
            data: null
        }
    }

}