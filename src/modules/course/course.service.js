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


exports.bigSeachForCourse = async (data) => {
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
        let searchResults = {}
        let foundCourse = []
        let filteredCourse = []
        let foundProgram = []
        let foundUniversity = []
        let filteredUniversities = []
        let uniOfferingACourse = []
        if(course_name){
            const course_name_lower = course_name.toLowerCase()
            foundCourse = await Course.findAll({
                where: {
                    name: { [Op.like]: `%${course_name_lower}%` },
                },
                raw: true,
            })
        }
        if(program_name){
            const program_name_to_lower = program_name.toLowerCase()
            foundProgram = await Program.findAll({
                where: {
                    name: { [Op.like]: `%${program_name_to_lower}%` },
                },
                raw: true,
            })
        }
        if(country_name){
            const country = country_name.charAt(0).toUpperCase()+ country_name.slice(1)
            foundUniversity = await University.findAll({
                where: {
                    [Op.or]:[
                        {country: { [Op.like]: `%${country}%` }},
                    ]
                },
                raw: true,
            })
            console.log(foundUniversity);
        }
        if(school_name ){
            const school_name_lower = school_name.toLowerCase()
            foundUniversity = await University.findAll({
                where: {
                    [Op.or]:[
                        {name: { [Op.like]: `%${school_name_lower}%` }},
                    ]
                },
                raw: true,
            })
        }        
        if(school_name && country_name){
            const country = country_name.charAt(0).toUpperCase()+ country_name.slice(1)
            const school_name_lower = school_name.toLowerCase()
            foundUniversity = await University.findAll({
                where: {
                    [Op.or]:[
                        {country: { [Op.like]: `%${country}%` }},
                        {name: { [Op.like]: `%${school_name_lower}%` }},
                    ]
                },
                raw: true,
            })
        console.log(foundUniversity[0]);
        }
        if (
            Number(foundCourse.length) > 0 
            && Number(foundProgram.length) < 1 
            && Number(foundUniversity.length) < 1
            )
            {
                for(const course of foundCourse){
                    const uni = await University.findOne({
                        where:{id: { [Op.like]: `%${course.school_name}%` }}
                    })
                    result.push(uni)
                    const uniqueIds = []
                    const filters = []
                    result.filter(async element => {
                        const isDuplicate = uniqueIds.includes(element.id)
                        
                        if(isDuplicate === false){
                            uniqueIds.push(element.id)
                            filters.push(element)
                        } 
                    })
                    searchResults = {
                        courses_found: foundCourse.length,
                        courses: foundCourse,
                        number_of_schools: filters.length,
                        schools: filters,
                    }
                }
        } else if (
            Number(foundCourse.length) > 0 
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) < 1
        ){
            const course_name_lower = course_name.toLowerCase()
            for (const item of foundProgram){
                const available_course = await Course.findAll({
                    where: {
                        name: { [Op.like]: `%${course_name_lower}%` },
                        // program_name: { [Op.like]: `%${item.name}%` },
                        ProgramId: item.id

                    },
                })
                result.push(...available_course)  
                for(const each of result){
                    const uni = await University.findOne({where:{id: each.UniversityId}})
                    foundUniversity.push(uni)  

                }
                const filters = []
                const uniqueIds = []
                foundUniversity.filter(async element => {
                        const isDuplicate = uniqueIds.includes(element.id)
                        
                        if(isDuplicate === false){
                            uniqueIds.push(element.id)
                            filters.push(element)
                        } 
                    })
                for(const foundUni of foundUniversity ){
                    const course = await Course.findOne({
                         where: {
                            name: { [Op.like]: `%${course_name_lower}%` },
                            UniversityId: foundUni.id,
                        },
                    })
                    filteredCourse.push(course)
                }
                searchResults = {
                    no_of_courses: filteredCourse.length,
                    courses: filteredCourse,
                    no_of_schools: filters.length,
                    schools: filters
                }            
            }

        }
        else if (
            Number(foundCourse.length) > 0 
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) > 0 
        ){
            const course_name_lower = course_name.toLowerCase()

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
                                name: { [Op.like]: `%${course_name_lower}%` },
                                // ProgramId: program.id,
                                program_name: {[Op.like]: `%${program_name}%`}
                            }
                        }
                    )
                    console.log("courses>>>>>>", available_course);

                    result.push(...available_course)
                    for(const each of available_course){
                        const uni = await University.findOne({where:{id:each.UniversityId}})
                        uniOfferingACourse.push(uni)
                    }
                     const filters = []
                    const uniqueIds = []
                    uniOfferingACourse.filter(async element => {
                        const isDuplicate = uniqueIds.includes(element.id)
                        
                        if(isDuplicate === false){
                            uniqueIds.push(element.id)
                            filters.push(element)
                        } 
                    })
                    searchResults = {
                        no_of_courses: available_course.length,
                        courses: available_course,
                        no_of_schools: filters.length,
                        schools: filters
                    }
                }

            }
        } else if (
            Number(foundCourse.length) < 1
            && Number(foundProgram.length) < 1 
            && Number(foundUniversity.length) > 0 
        ) {
            searchResults = {
                no_of_schools: foundUniversity.length,
                schools: foundUniversity
            }
        } else if(
             Number(foundCourse.length) < 1
            && Number(foundProgram.length) > 0
            && Number(foundUniversity.length) < 1
        ) {
            for (const program of foundProgram){
                const course = await Course.findAll({where: {ProgramId: program.id}})
                const uni = await University.findOne({where: {id: program.UniversityId}})
                foundUniversity.push(uni)
                foundCourse.push(...course)
                searchResults = {
                    no_of_programs: foundProgram.length,
                    programs: foundProgram,
                    // no_of_courses: foundCourse.length,
                    // courses: foundCourse,
                    no_of_schools: foundUniversity.length,
                    schools: foundUniversity
                }

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
                if(courses){
                 result.push(courses)
                }
                }
                for(const filter of result){
                    const uni = await University.findOne({where:{id:filter.UniversityId}})
                    filteredUniversities.push(uni)
                }
                const filters = []
                const uniqueIds = []
                filteredUniversities.filter(async element => {
                    const isDuplicate = uniqueIds.includes(element.id)
                    
                    if(isDuplicate === false){
                        uniqueIds.push(element.id)
                        filters.push(element)
                    } 
                })
                searchResults = {
                    no_of_courses: result.length,
                    courses: result,
                    no_of_schools: filters.length,
                    schools: filters
                }
            }
        } else if (
            Number(foundCourse.length) <1
            && Number(foundProgram.length) > 0 
            && Number(foundUniversity.length) > 0
        ) {
            for(const uni of foundUniversity){
                for (const prog of foundProgram){
                    const filteredProg = await Program.findOne({where:{
                        id: prog.id,
                        UniversityId: uni.id
                    }})
                    if(filteredProg !== null){
                        result.push(filteredProg)
                    }
                }
                for(const filter of result){
                    if (filter !== null){
                        const filteredUni = await University.findOne({where:{id: filter.UniversityId}})
                        filteredUniversities.push(filteredUni)
                    }
                    
                }
                const filters = []
                const uniqueIds = []
                filteredUniversities.filter(async element => {
                    const isDuplicate = uniqueIds.includes(element.id)
                    
                    if(isDuplicate === false){
                        uniqueIds.push(element.id)
                        filters.push(element)
                    } 
                })
                searchResults = {
                    no_of_programs: result.length,
                    programs: result,
                    no_of_schools: filters.length,
                    schools: filters
                }
            
            }
        } else {
            let paginatedResult
            // paginate the result
            const allUnis = await University.findAll({
                attributes: [
                    "id",
                    "images",
                    "name",
                    "description",
                    "ratings",
                    "created_at",
                    "updated_at"
                ],
                order: [
                    ['ratings', 'ASC']
                ]
            })
            if(page){
                paginatedResult = await paginateRaw(allUnis, {
                    limit: 10,
                    page: Number(page)
                })
            }else{
                paginatedResult = await paginateRaw(allUnis, {
                    limit: 10,
                    page: 1
                })
            }
            searchResults = {
                no_of_schools: allUnis.length,
                schools: paginatedResult
            }
        }
        return {
            error: false,
            message: "search result retreived successfully",
            data: searchResults
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


exports.searchCourseUnderAUniversity = async (data) => {
    try {
        const {search, university_id} = data

        const foundCourses = await Course.findAll({
            where:{
                name:{[Op.like]: `%${search}%`},
                UniversityId: university_id
            }
        })
        if (foundCourses.length < 1){
            return {
                error: false,
                message: "No results found",
                data: []
            }
        }

        return {
            error: false,
            message: "Courses retrieved successfully",
            data: foundCourses
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
        const filteredCourses = []
        const allCourses = await Course.findAll({where:{UniversityId: university.id}})
        if(allCourses.length < 1) {
            return {
                error: false,
                message: 'No course found',
                data: {
                    allCourses: [],
                    pagination: 0
                }
            }
        }
        for(const course of allCourses){
            const allClasses = await Class.findAll({where:{CourseId: course.id}})
            const fineTunedCourse = {
                id: course.id,
                name: course.name,
                description: course.description,
                program_name: course.program_name,
                school_name: course.school_name,
                available_diet: allClasses
            }
            filteredCourses.push(fineTunedCourse)
        }


        const paginatedResult = await paginateRaw(filteredCourses, {
            limit: Number(limit),
            page: Number(page),
        })
        return {
            error: false,
            message: "All courses retreived successfully",
            data: {
                allCourses: paginatedResult,
                pagination: paginatedResult.perPage
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

exports.editCourseAuto = async (data) => {
    try {
        const {limit, page} = data
        const updatedCourses = []
        const allCourses = await Course.findAll({where: {deleted: false}})
        for(const course of allCourses){
            const program = await Program.findOne({where:{id: course.ProgramId}})
            const school = await University.findOne({where:{id: course.UniversityId}})
            await Course.update(
                {
                    program_name: program.name,
                    school_name: school.name
                },
                {where: {id: course.id}}
            )
            const updatedCourse = await Course.findOne({where:{id: course.id}})
            updatedCourses.push(updatedCourse)
        } 
        if(updatedCourses.length < 1){
            return {
                error: false,
                message: "NO course found",
                data: {
                    allCourses: [],
                    pagination: 0
                }
            }
        }

        const paginatedResult = await paginateRaw(updatedCourses,{
            limit: Number(limit),
            page: Number(page)
        })

        return {
            error: false,
            message: "Courses updated successfully",
            data:{
                allCourses: paginatedResult,
                pagination: paginatedResult.perPage
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Error updating all courses at the moment",
            data: null
        }
    }
}

exports.editProgramsAuto = async (data) => {
    try {
        const {limit, page} = data
        const updatedPrograms = []
        const allPrograms = await Program.findAll({where: {deleted: false}})
        for(const program of allPrograms){
            const school = await University.findOne({where:{id: program.UniversityId}})
            await Program.update(
                {
                    university_name: school.name
                },
                {where: {id: program.id}}
            )
            const updatedProgram = await Program.findOne({where:{id: program.id}})
            updatedPrograms.push(updatedProgram)
        } 
        if(updatedPrograms.length < 1){
            return {
                error: false,
                message: "NO course found",
                data: {
                    allPrograms: [],
                    pagination: 0
                }
            }
        }

        const paginatedResult = await paginateRaw(updatedPrograms,{
            limit: Number(limit),
            page: Number(page)
        })

        return {
            error: false,
            message: "Courses updated successfully",
            data:{
                allPrograms: paginatedResult,
                pagination: paginatedResult.perPage
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "Error updating all courses at the moment",
            data: null
        }
    }
}