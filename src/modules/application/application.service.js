const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const randomString = require('../../common/helpers/randString')
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')
const {
    sequelize,
    University,
    Course,
    Program,
    Class,
    Application,
    Tracker

} = models


exports.createApplication = async (data) => {
        try {
        const {
            first_name,
            id,
            last_name, 
            phone_number,
            email,
            nationality,
            gender
        } = data

        const intendingCourse = await Course.findOne({
            where:{id}
        })
        if(!intendingCourse){
            return {
                error: true,
                message: "Course not found",
                data: null
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
            application_fees: intendingCourse.application_fees,
            CourseId: intendingCourse.id
        })

        const tracker = await Tracker.create({
            status: application.status,
            tracking_id: application.tracking_id,
            ApplicationId: application.id
        })


        return {
            error: false,
            message: "application initiated, proceed to neccessary payment",
            data: {
                application,
                tracker
            }
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

