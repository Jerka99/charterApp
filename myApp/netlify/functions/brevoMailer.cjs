const SibApiV3Sdk = require('sib-api-v3-sdk');
require("dotenv").config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API;
