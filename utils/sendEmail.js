const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const myOAuth2Client = new OAuth2(
  "1002547499057-h0k8er0627ih7o4q0nvd0c0gefqm9dls.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
)


  myOAuth2Client.setCredentials({
      refresh_token:"1//04OAbo85GO3wCCgYIARAAGAQSNwF-L9IrU3HYvlPlmK33tXSQC6Ya_WLD8ic4M86wFpGtjNisIo7NAXqcU8wYZf06fj8O88FwWWo"
      });

const myAccessToken = myOAuth2Client.getAccessToken()



const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false
      },
      host: "smtp.gmail.com",
      auth: {
           type: "OAuth2",
           user: "process.env.USER", 
           clientId: " 1002547499057-h0k8er0627ih7o4q0nvd0c0gefqm9dls.apps.googleusercontent.com",
           clientSecret: "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",
           refreshToken: "1//04OAbo85GO3wCCgYIARAAGAQSNwF-L9IrU3HYvlPlmK33tXSQC6Ya_WLD8ic4M86wFpGtjNisIo7NAXqcU8wYZf06fj8O88FwWWo",
           accessToken: myAccessToken //access token variable we defined earlier
      }});

    await transporter.sendMail({
      from: process.env.USER,
      to: process.env.USER,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
