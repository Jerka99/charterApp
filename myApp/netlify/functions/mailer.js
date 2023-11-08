const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


function createMailClient() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_EMAIL_ADDRESS,
      clientId: process.env.GMAIL_API_CLIENT_ID,
      clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
    },
  });
}

const mailClient = createMailClient();

exports.handler = async (event, context) => {
  const { email, text } = JSON.parse(event.body);

  try {
    // const json = JSON.parse(event.body);
    const gmailResponse = await mailClient.sendMail({
      from: `antoniojerka@gmail.com`, // sender address
      to: email, // list of receivers
      subject: "json.subject",
      text: text, // plain text body
      html: `<b style="color: purple; background-color: #e5e5e5; height: 33px;">${text}</b>`,
    });

    return {
      statusCode: 200,
      body: "Message sent!" + gmailResponse.messageId,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

// const createTransporter = async () => {
//   const oauth2Client = new OAuth2(
//     process.env.GMAIL_API_CLIENT_ID,
//     process.env.GMAIL_API_CLIENT_SECRET,
//     "https://developers.google.com/oauthplayground"
//   );

//   oauth2Client.setCredentials({
//     refresh_token: process.env.GMAIL_API_REFRESH_TOKEN,
//   });

//   const accessToken = await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((err, token) => {
//       if (err) {console.log('err',err)
//         reject();
//       }
//       console.log('token',token)
//       resolve(token);
//     });
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.GMAIL_EMAIL_ADDRESS,
//       accessToken,
//       clientId: process.env.GMAIL_API_CLIENT_ID,
//       clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
//       refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
//     },
//   });
//   console.log('transporter',transporter)

//   return transporter;
// };

// exports.handler = async (event, context) => {
//   const { email, text } = event.body;
//   console.log(event.body);
//   let emailTransporter = await createTransporter();
//   try {
//     const gmailResponse = await emailTransporter.sendMail({
//       from: `antoniojerka@gmail.com`, // sender address
//       to: email, // list of receivers
//       subject: "json.subject",
//       text: text, // plain text body
//       html: "<b>Hello world???</b>",
//     });
//     return {
//       statusCode: 200,
//       body: "Message sent!" + gmailResponse.messageId,
//     };
//   } catch (err) {console.log('err',err)
//     return { statusCode: 500, body: err.toString() };
//   }
// };
