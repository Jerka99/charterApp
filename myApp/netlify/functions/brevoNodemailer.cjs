const nodemailer = require("nodemailer");
require("dotenv").config();


exports.handler = async (event, context) =>{
    const { email, text } = JSON.parse(event.body);
    console.log('brevo')
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
      const response = await mailClient.sendMail({
        from: `antoniojerka@gmail.com`, // sender address
        to: email, // list of receivers
        subject: "json.subject",
        text: text, // plain text body
        html: `<b style="color: purple; background-color: #e5e5e5; height: 33px;">${text}</b>`,
      });
      console.log(response)
      return {
        statusCode: 200,
        body: "Message sent!",
      };
    } catch (err) {
      return { statusCode: 500, body: err.toString() };
    }
  };
  