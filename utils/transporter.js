const { createTransport } = require("nodemailer");
require("dotenv").config();
const { EMAIL, EMAIL_PASSWORD } = process.env;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

module.exports = transporter;
