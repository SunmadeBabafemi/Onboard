const KEYS = require('../config/keys')
const querystring = require("querystring");
function getGoogleAuthUrl(){
    try {
         const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
        const options = {
            redirect_uri :'https://onboard.com.ng/auth/google',
            client_id: KEYS.googleClientId,
            access_type: "offline",
            response_type: "code",
            prompt: "consent",
            scope: [
                'https://www.googleapis.com/auth.userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ].join(' ')
        }
        return {
            error: false,
            message: 'Success',
            data: `${rootUrl}?${querystring.stringify(options)}`
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "unable to perform google signin action"|| error.message
        }
    }
   
}
module.exports = getGoogleAuthUrl()