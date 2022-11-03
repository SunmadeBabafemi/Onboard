const models = require('../../db/models')
var Sequelize = require('sequelize')
const ggOAuth = require('../../common/helpers/googleAuth')
const {hashPassword, comparePassword, forgotPassword, resetPassword, completeSignup} = require('../../common/helpers/password')
const {jwtSign, jwtVerify, jwtDecode} = require('../../common/helpers/token')
const { ImageUploader } = require('../../common/helpers/cloudinaryUpload')
const {
    sequelize,
    User,
    OneTimePassword
     
} = models

exports.registerUser = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingUser = await User.findAll({
            where:{
                email: data.email
            }
        })

        if(existingUser.length > 0){
            return{
                error: true,
                message: 'Email already exist on the server',
                data: null
            }
        }

        const newUser = await User.create(
            {
                ...data,
                password: data.password? password: null,
            },
            {raw: true}
        )
        
        const signup = await completeSignup(User, newUser.email)

        return {
            error: signup.error,
            message: signup.message,
            data: signup.data
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.getGoogleAuth = async () => {
    try {
        const ggAuth = await ggOAuth
        const url = ggAuth.data
        return {
            error: false,
            message:'successfully retrieved',
            data: url
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: 'Unable to perform action at the moment'||error.message,
            data: null
        }
    }
}

exports.completeSignup = async (otp) => {
    try {
        const existingOtp = await OneTimePassword.findOne({where: {otp}})
        if(!existingOtp){
            return {
            error: true,
            message: "Wrong OTP inputed",
            data: null
            };
        }
        const {id} = await jwtDecode(existingOtp.signedToken)
        await User.update(
            {isVerified: true},
            {where:{id}}
        )

        await OneTimePassword.destroy({where: {otp}})
        const verfiedUser = await User.findOne({
            attributes:['id', 'full_name', 'email', 'phone_number', 'profile_picture', 'isVerified', 'created_at', 'updated_at'],
            where:{id}
        })

        return {
            error: false,
            message: "User verification successful",
            data: verfiedUser
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: error.message || "unable to verify user at the moment",
            data: null
        }
    }
    
}

exports.loginUser = async(user, data) => {
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
        await User.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginUser = await User.findOne({
            attributes:['email','full_name', 'id', 'accessTokens'],
            where: {id:user.id}
        })

        return{
            error: false,
            message: 'Login successful',
            data: {loginUser, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in user at the moment",
            data: null
        }
    }
}

exports.logoutUser = async(token) => {
    try {
        const {id} = jwtVerify(token)
        const loggedInuser = await User.findOne({where:{id: id}})
        if(!loggedInuser){
            return {
                error: true,
                message: "User not found",
            }
        }
        await User.update(
            {refreshTokens: null},
            {where: {id: loggedInuser.id}}
        )

        const loggedOutUser = await User.findOne({where: {id: loggedInuser.id}})
        return{
            error: false,
            message: 'Logout successful',
            data: loggedOutUser
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log out user at the moment",
            data: null
        }
    }
}

exports.editUserProfile = async (data) => {
    try {
        const{
            user_id,
            body,
            file
        } = data
        const existingUser = await User.findOne({where:{id:user_id}})
        if(!existingUser){
            return {
                error: true,
                message: "User not found",
                data: null
            }
        }
        if (file){
            const {path} = file
            const url = await ImageUploader(path)
            await User.update(
                {
                    ...body,
                    profile_picture: url
                },
                {where:{id:user_id}}
            ) 
        } 
        await User.update(
            {
                ...body,
            },
            {where:{id:user_id}}
        )

        const updatedUser = await User.findOne({
            attributes:{excludes:['password']},
            where:{id:user_id}
        })
        return {
            error: false,
            message:"User's profile updated successfully",
            data: updatedUser
        }

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message:"Unable to update user's profile at the moment",
            data: null
        }
    }
}

// exports.forgotPassword = async(body) => {
//     try {
//         const {email} = body
//         const forgot = await forgotPassword(User, email)
//         return{
//             error: forgot.error,
//             message: forgot.message,
//             data: forgot.data
//         }

//     } catch (error) {
//         console.log(error)error
//         return{
//             error: true,
//             message: error.message|| "Unable to send email at the moment",
//             data: null
//         }
//     }
// }

// exports.resetPassword = async(body) => {
//     try {
//         const {newPassword, otp} = body
//         const {model, email} = await resetPassword(User, otp, newPassword)

//     return{
//         error: false,
//         message: `password of ${email} changed successfully`,
//         data: model
//     }

//     } catch (error) {
//         console.log(error)
//         return{
//             error: true,
//             message: error.message|| "Unable to change password at the moment",
//             data: null
//         }
//     }
// }