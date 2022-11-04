const models = require('../../db/models')
var Sequelize = require('sequelize')
const {Op} = Sequelize
const {getPaginatedRecords, paginateRaw} = require('../../common/helpers/paginate')
const {courses} = require('../../db/seeders/courses')
const {
    sequelize,
    University,
    Course,
    Program,
    Class

} = models


exports.seachForCourse = async (data) => {
        try {
        const {
            limit,
            page,
            school_name, 
            program_name,
            course_name,
            country_name
        } = data
        let result = []
        const foundCourse = await Course.findAll({
            where: {
                name: { [Op.like]: `%${course_name}%` },
            },
            raw: true,
        })

        const foundProgram = await Program.findAll({
             where: {
                name: { [Op.like]: `%${program_name}%` },
            },
            raw: true,
        })
        const foundUniversity = await University.findAll({
            where: {
                [Op.or]:[
                    {country: { [Op.like]: `%${country_name}%` }},
                    {name: { [Op.like]: `%${school_name}%` }},
                ]
            },
            raw: true,
        })
        if (
            Number(foundCourse.length) > 0 
            && Number(foundProgram.length) < 1 
            && Number(foundUniversity.length) < 1
            )
            {
                result = foundCourse
        } else if (
            Number(foundCourse.length) > 0 
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) < 1
        ){
            for (const item of foundProgram){
                const available_course = await Course.findAll({
                    where: {
                        name: { [Op.like]: `%${course_name}%` },
                        ProgramId: item.id,
                    },
                })
                result.push(...available_course)                
            }


        }
        else if (
            Number(foundCourse.length) > 0 
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) > 0 
        ){
            for (const university of foundUniversity){
                const program = await Program.findOne({
                    where:{
                        name: { [Op.like]: `%${program_name}%` },
                        UniversityId: university.id
                    }
                })
                if(program){
                    const available_course = await Course.findAll(
                        {
                            where: {
                                name: { [Op.like]: `%${course_name}%` },
                                ProgramId: program.id
                            }
                        }
                    )
                    result.push(...available_course)
                }

            }
        } else if (
            Number(foundCourse.length) < 1
            && Number(foundProgram.length) < 1 
            && Number(foundUniversity.length) > 0 
        ) {
            result = foundUniversity
        } else if(
             Number(foundCourse.length) < 1
            && Number(foundProgram.length) > 0
            && Number(foundUniversity.length) < 1
        ) {
            for (const program of foundProgram){
                const course = await Course.findAll({where: {ProgramId: program.id}})
                result.push(...course)
            }
        } else if(
            Number(foundCourse.length) > 0
            && Number(foundProgram.length) < 1 
            && Number(foundUniversity.length) > 0 
        ){
            for (const uni of foundUniversity){
                for(const course of foundCourse){
                 const courses = await Course.findOne({
                    where:{
                        id: course.id,
                        UniversityId: uni.id
                    }
                })
                result.push(courses)
                }
            }
        } else if(
             Number(foundCourse.length) <1
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) <1
        ) {
            for(const prog of foundProgram){
                const courses = await Course.findAll({where:{ProgramId: prog.id}})
                result.push(...courses)
            }
        } else if (
            Number(foundCourse.length) <1
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) > 0
        ) {
            for(const uni of foundUniversity){
                for (const prog of foundProgram){
                    const courses = await Course.findAll({where:{
                        ProgramId: prog.id,
                        UniversityId: uni.id
                    }})
                    result.push(...courses)
                }
            }
        }
 

        // paginate the result
        const paginatedResult = await paginateRaw(result, {
            limit: Number(limit),
            page: Number(page)
        })
        if (Number(paginatedResult.data.length) < 1){
            return {
                error: false,
                message: "No result found based on your search filter",
                data: {
                    foundResults: [],
                    pagination: null
                }
            }
        } else{
            return {
                error: false,
                message: "search result retreived successfully",
                data: {
                    foundResults: paginatedResult,
                    pagination: paginatedResult.perPage
                }
            }
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


exports.getOneCourseById = async (data) => {
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
exports.getallCoursesByUniversity = async(data)=>{
    try {
        const {
            id,
            limit,
            page
        } = data
        const university = await University.findOne({
            where: {id}
        })

        if(!university){
            return {
                error: true,
                message: "University Not Found",
                data: null
            }
        }
        const allCourses = await getPaginatedRecords(Course, {
            limit: Number(limit),
            page: Number(page),
            data:{UniversityId: university.id},
            selectedFields: ['id', 'name', 'description', 'UniversityId', 'ProgramId']
        })
        return {
            error: false,
            message: "All courses retreived successfully",
            data: {
                allCourses: allCourses,
                pagination: allCourses.perPage
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

exports.getallCourses = async(data)=>{
    try {
        const {
            limit,
            page
        } = data
        const allCourses = await getPaginatedRecords(Course, {
            limit: Number(limit),
            page: Number(page),
            selectedFields: ['id', 'name', 'description', 'UniversityId', 'ProgramId']
        })
        return {
            error: false,
            message: "All courses retreived successfully",
            data: {
                allCourses: allCourses,
                pagination: allCourses.perPage
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

exports.seedCourses = async (data) => {
    try {
        const {limit, page} = data
        let allPrograms = await Program.findAll()
        let allCourses = []
        const allUniversities = await University.findAll()
        for(const university of allUniversities){
            var undergraduate = await Program.create({
                name: "undergraduate",
                description: "undergraduate courses that take 4 to 5 years",
                duration: 4,
                UniversityId: university.id
            })
            var graduate = await Program.create({
                name: "graduate",
                description: "graduate courses that take 1 to 2 years",
                duration: 2,
                UniversityId: university.id
            })
            var postGraduate = await Program.create({
                name: "postGraduate",
                description: "postGraduate courses that take 3 to 4 years",
                duration: 4,
                UniversityId: university.id
            })
            var advancedLearning = await Program.create({
                name: "advancedLearning",
                description: "advancedLearning courses that take 3 to 4 years",
                duration: 3,
                UniversityId: university.id
            })

            allPrograms.push(undergraduate, graduate, postGraduate, advancedLearning)
            
        }

        for(const program of allPrograms){
            for(const course_name of courses){
                const course = await Course.create({
                    name: course_name,
                    description: `this is a course for ${program.name} studies`,
                    tuition: Math.floor(Math.random()*10000),
                    duration: program.duration,
                    ProgramId: program.id,
                    UniversityId: program.UniversityId
                })
                allCourses.push(course)
            }
        }
        const paginatedResult = await paginateRaw(
            allCourses,
            {
                limit: Number(limit),
                page: Number(page)
            }
            )
        return{
            error: false,
            message: "all courses",
            data: {
                allCourses: paginatedResult,
                pagination: paginatedResult.perPage
            }
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
