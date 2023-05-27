const nodemailer = require("nodemailer");

const sendEmail = async(email, subject, text)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                

            }
            
        })
    }
}