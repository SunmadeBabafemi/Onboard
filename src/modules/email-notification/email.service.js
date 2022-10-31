const models = require('../../db/models')
var Sequelize = require('sequelize')
const randomString = require('../../common/helpers/randString')
const nodemailer = require('nodemailer')
const KEYS = require('../../common/config/keys')

const {
    sequelize,
    Order,
    Product,
    OrderedItem,
    Merchant,
    Inventory,
    Tracker
} = models

exports.sendOTPtoMail = async (data) =>{
    try {
        const{email, mailSubject, fullName, otp} = data
        const firstName = fullName.split(' ')[1]
        const message = {
            from: KEYS.mailSender,
            to: email,
            subject: mailSubject,
            html: `<h1>Hello ${firstName}, here's your otp:</h1> <h2>${otp}</h2>`

        }
        let transporter =  nodemailer.createTransport({
            host: KEYS.mailHost,
            service:'Gmail',
            auth:{
                user: KEYS.mailAuthUser,
                pass: KEYS.mailAuthPass
            }
        })

      let info =  await  transporter.sendMail(message)
        if(!info){
            return{
                error: true,
                message: "Unable to send email at the moment",
                data: null
            }
        }
        return{
            error: false,
            message: `Successfully sent mail to: ${email}`,
            data: info
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



exports.sendMailToApplicant = async (data) =>{
    try {
        const{
           first_name,
           last_name, 
           phone_number,
           email,
           nationality,
           gender,
           tracking_id,
           application_fees,
           class_diet,
           course_name,
           school_name
        } = data
        const content = {
        from: KEYS.mailSender,
        to: email,
        subject: "Successful Application",
        html: `
            <h2>Hello ${first_name},</h2> 
            <h3>Find below the details of application</h3>
            <h4>FIRST NAME: ${first_name}</h4>
            <h4>LAST NAME: ${last_name}</h4>
            <h4>PHONE NUMBER: ${phone_number}</h4>
            <h4>EMAIL: ${email}</h4>
            <h4>NATIONALITY: ${nationality}</h4>
            <h4>GENDER: ${gender}</h4>
            <h4>TRACKING ID: ${tracking_id}</h4>
            <h4>APPLICATION FEES: ${application_fees}</h4>
            <h4>CLASS DIET: ${class_diet}</h4>
            <h4>COURSE NAME: ${course_name}</h4>
            <h4>SCHOOL NAME: ${school_name}</h4>
        `
        }
        let transporter =  nodemailer.createTransport({
            host: KEYS.mailHost,
            service:'Gmail',
            auth:{
                user: KEYS.mailAuthUser,
                pass: KEYS.mailAuthPass
            }
        })

        let info =  await  transporter.sendMail(content)
        if(!info){
            return {
                error: true,
                message: `Unable to send email to ${email} at the moment`,
                data: null
            } 
        } else{
            return {
                error: false,
                message: `Successfully sent mail to: ${email}`,
                data: null
            } 
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
