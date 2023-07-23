const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "1002547499057-h0k8er0627ih7o4q0nvd0c0gefqm9dls.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
"1//04YtnQs5KgUC_CgYIARAAGAQSNwF-L9IrS88sAnUFZwLIgfsJv5IV2i6pbjooD-tTm8cPLXKAC8EeL0gGAdcCCxNbdkkiAwRSc9I";
  

const myOAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

myOAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = async (email, subject, text) => {
  try {
    const accessToken = await myOAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      tls: { rejectUnauthorized: false },
      auth: {
        type: "oauth2",
        user: "johnsondeveloper2@gmail.com",
        pass: "Sur@1kavin",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    await transport.sendMail({
      from: "johnsondeveloper2@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    return error;
  }
};
