const models = require('../../../db/models')
var Sequelize = require('sequelize')
const {hashPassword, comparePassword,forgotPassword, resetPassword} = require('../../../common/helpers/password')
const { jwtSign, jwtVerify} = require('../../../common/helpers/token')
const { ImageUploader } = require('../../../common/helpers/cloudinaryUpload')
const {
    sequelize,
    Admin,
} = models

exports.registerAdmin = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingAdmin = await Admin.findAll({
            where:{
                email: data.email
            }
        })

        if(existingAdmin.length > 0){
            return{
                error: true,
                message: 'Admin with this Email already exist on the server',
                data: null
            }
        }
        const newAdmin = await Admin.create(
            {
                ...data,
                password: data.password? password: null
            },
            {raw: true}
        )
        return {
            error: false,
            message: "Admin registered successfully",
            data: newAdmin
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable to register Admin at the moment",
            data: null
        }
        
    }
}

exports.viewAdminProfile = async(user_id) => {
    try {
        const admin = await Admin.findOne({
            attributes:{exclude:['password']},
            where:{id:user_id, deleted: false}
        })

        if(!admin){
            return {
                error: true,
                message: "Admin Not Found",
                data: null
            }
        }

        return {
            error: false,
            message: "Admin Profile retreived successfully",
            data: admin
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message || "Unable to retrieve Admin's Profile at the moment",
            data: null
        }
    }
}

exports.editAdminProfile = async(payload) => {
    try {
        const {
           user_id,
           password,
           avatar ,
           phone_number
        } = payload
        let url
        let hashed 
        const admin = await Admin.findOne({
            where:{id:user_id, deleted: false}
        })

        if(!admin){
            return {
                error: true,
                message: "Admin Not Found",
                data: null
            }
        }
        if(avatar){
            const {path} = avatar
            url = await ImageUploader(path)
        }
        if(password){
            hashed = hashPassword(password)
        }

        await Admin.update(
            {
                avatar: avatar?url:admin.avatar,
                password: password? hashed: admin.password,
                phone_number: phone_number? phone_number: admin.phone_number
            },
            {
                where:{id:user_id}
            }
        )
        
        const editedAdmin = await Admin.findOne({
            attributes:{exclude:["password"]},
            where:{id: admin.id}
        })

        return {
            error: false,
            message: "Admin Profile edited successfully",
            data: editedAdmin
        }
    } catch (error) {
        console.log(error);
        return{
            error: true,
            message: error.message || "Unable to retrieve Admin's Profile at the moment",
            data: null
        }
    }
}

exports.loginAdmin = async(user, data) => {
    try {
        if(data.password){
            const passwordMatch = await comparePassword(user.password, data.password)
            if (!passwordMatch) {
                return {
                    error: true,
                    message: "Incorrect password.",
                };
            }
        }
         if(!data.password && !data.auth_type){
            return {
                error: true,
                message: "Invalid Authorization",
            };
        }

        const refreshToken = jwtSign(user.id)
        await Admin.update(
            {access_tokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginAdmin = await Admin.findOne({
            attributes:['email','full_name', 'id', "role"],
            where: {id:user.id}
        })



        return{
            error: false,
            message: 'Login successful',
            data: {loginAdmin, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in admin at the moment",
            data: null
        }
    }
}

exports.logoutAdmin = async(token) => {
    try {
        const {id} = jwtVerify(token)
        const loggedInAdmin = await Admin.findOne({where:{id: id}})
        if(!loggedInAdmin){
            return {
                error: true,
                message: "User not found",
            }
        }
        await Admin.update(
            {access_tokens: null},
            {where: {id: loggedInAdmin.id}}
        )

        const loggedOutAdmin = await Admin.findOne({where: {id: loggedInAdmin.id}})
        return{
            error: false,
            message: 'Logout successful',
            data: loggedOutAdmin
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log out admin at the moment",
            data: null
        }
    }
}

exports.forgotPassword = async(body) => {
    try {
        const {email} = body
        const forgot = await forgotPassword(Admin, email)
        return{
            error: forgot.error,
            message: forgot.message,
            data: forgot.data 
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to send email at the moment",
            data: null
        }
    }
}

exports.resetPassword = async(body) => {
    try {
        const {newPassword, otp} = body
        const {model, email} = await resetPassword(Admin, otp, newPassword)

    return{
        error: false,
        message: `password of ${email} changed successfully`,
        data: model
    }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to change password at the moment",
            data: null
        }
    }
}