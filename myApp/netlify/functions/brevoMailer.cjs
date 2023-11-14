const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendinblue = (sendSmtpEmail) => {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      return true;
    },
    function (error) {
      console.error(error);
      return false;
    }
  );
};


exports.handler = async (event, context) => {
  const { email, text } = JSON.parse(event.body);console.log(email, text)
  let sendSmtpEmail = {
    to: [
      {
        email: email,
      },
    ],
    templateId: 1,
    params: {
      name: "Malith",
      subject: "Someone sent you a link",
      text: text,
    },
  };
  sendinblue(sendSmtpEmail);
  console.log(sendinblue);
  return {
    statusCode: 200,
    body: "Message sent!",
  };
};
