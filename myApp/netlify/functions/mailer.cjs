const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_API_CLIENT_ID,
  process.env.GMAIL_API_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_API_REFRESH_TOKEN,
});

exports.handler = async (event, context) =>{
  const { email, text } = JSON.parse(event.body);
  console.log("ACCESS_TOKEN");

  try {
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    console.log("ACCESS_TOKEN", ACCESS_TOKEN.data);  
    const mailClient = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_EMAIL_ADDRESS,
        clientId: process.env.GMAIL_API_CLIENT_ID,
        clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
      },
    });

    // const json = JSON.parse(event.body);
    const gmailResponse = await mailClient.sendMail({
      from: `antoniojerka@gmail.com`, // sender address
      to: email, // list of receivers
      subject: "json.subject",
      text: text, // plain text body
      html: `<b style="color: purple; background-color: #e5e5e5; height: 33px;">${text}</b>`,
    });
    console.log(gmailResponse)
    return {
      statusCode: 200,
      body: "Message sent!",
      // body: "Message sent!" + gmailResponse.messageId,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

