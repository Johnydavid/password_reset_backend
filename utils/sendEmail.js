const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const app = express();

const CLIENT_ID = '1002547499057-h0k8er0627ih7o4q0nvd0c0gefqm9dls.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04MCVT-2DM5VdCgYIARAAGAQSNwF-L9IryjMIN96_-9tE4IZOghmr3hILxnHJYeG94MCfgcjOtwyXJJvWCDqlnl5Bzb6WsxEpB_E'





const sendEmail = async (email, subject, text) => {
  try {
const myOAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const myAccessToken = myOAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
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
          accessToken : myAccessToken
      }
    }});

    await transport.sendMail({
      from: process.env.USER,
      to: process.env.USER,
      subject: "hello",
      text: "Hello World",
      html: "<b>Hello world?</b>",
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};


// const sendEmail = ()=>{
//   const myOAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
  
  
//     myOAuth2Client.setCredentials({
//         refresh_token:"1//04ltmsghgWwk0CgYIARAAGAQSNwF-L9IrIJCHyddZC5iNSyy3bSxUgfnKQbdVTymSuAmj9uRb1OQ3of05mirbGawZeFeqGXCackY"
//         });
  
// const myAccessToken = myOAuth2Client.getAccessToken()
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//        port: 465,
//       secure: true,
//       tls : { rejectUnauthorized: false },
//       auth:{
//           type: 'oauth2',
//           user: 'johnsondeveloper2@gmail.com',
//           pass:'Sur@1kavin',
//           clientId: CLIENT_ID,
//           clientSecret: CLIENT_SECRET,
//           refreshToken: REFRESH_TOKEN,
//           accessToken : myAccessToken
//       }
//     }});

//     app.post('/sendmail',function(req,res){
//       const mailOptions = {
//       from: process.env.USER, // sender
//       to: 'dropin2johny@gmail.com', // receiver
//       subject: 'Password Reset', // Subject
//       html: '<p>You have received this email using nodemailer, you are welcome ;)</p>'// html body
//       }
//       transport.sendMail(mailOptions,function(err,result){
//       if(err){
//       res.send({
//       message:err
//       })
//       }else{
//       transport.close();
//       res.send({
//       message:'Email has been sent: check your inbox!'
//       })
//       }
//       })
//       })

// }

module.exports = sendEmail;
