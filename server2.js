const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '1002547499057-h0k8er0627ih7o4q0nvd0c0gefqm9dls.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04MCVT-2DM5VdCgYIARAAGAQSNwF-L9IryjMIN96_-9tE4IZOghmr3hILxnHJYeG94MCfgcjOtwyXJJvWCDqlnl5Bzb6WsxEpB_E'


const myOAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

myOAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})





async function sendMail(){
    try{

        const accessToken = await myOAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
             port: 465,
            secure: true,
            tls : { rejectUnauthorized: false },
            auth:{
                type: 'oauth2',
                user: 'johnsondeveloper2@gmail.com',
                pass:'Sur@1kavin',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken : accessToken
            }
        })

        const mailOptions = {
            from: 'johnsondeveloper2@gmail.com',
            to: 'dropin2johny@gmail.com',
            subject: 'Helllo from Johnson David',
            text: "Hello World",
           html: "<b>Hello world!!</b>",
        };
        const result = await transport.sendMail(mailOptions)
        return result

    }catch (error){
        return error
    }
}

sendMail().then(result=> console.log("Email has sent", result))
.catch(error => console.log(error.message))