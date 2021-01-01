const transporter = require("./transporter");

const wrappedSendEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = wrappedSendEmail;
