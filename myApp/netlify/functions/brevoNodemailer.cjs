const nodemailer = require("nodemailer");
require("dotenv").config();


exports.handler = async (event, context) =>{
    const { email, text } = JSON.parse(event.body);

    try {
      const mailClient = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_EMAIL_ADDRESS,
          pass: process.env.BREVO_SMTP
        },
      });
  
      // const json = JSON.parse(event.body);
      const AdminResponse = await mailClient.sendMail({
        from: email, // sender address
        to: process.env.GMAIL_EMAIL_ADDRESS, // list of receivers
        subject: "json.subject",
        text: text, // plain text body
        html: `<b style="color: purple; background-color: #e5e5e5; height: 33px;">${text}</b>`,
      });

      const ClientResponse = await mailClient.sendMail({
        from: process.env.GMAIL_EMAIL_ADDRESS, // sender address
        to: email, // list of receivers
        subject: "json.subject",
        text: text, // plain text body
        html: `<b style="color: purple; background-color: #e5e5e5; height: 33px;">Sucessfully sent!</b>`,
      });

      console.log(ClientResponse, AdminResponse)
      return {
        statusCode: parseInt(ClientResponse.response, AdminResponse.response),
        body: "Message sent!",
      };
    } catch (err) {
      return { statusCode: 500, body: err.toString() };
    }
  };
  