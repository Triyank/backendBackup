const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
const fs = require("fs");
// const path = require("path");
const wrappedSendEmail = require("../utils/sendEmail");
const { sendMail, generateJwt } = require("../utils");
require("dotenv").config();
const { SECRET_KEY, EMAIL, RESET_KEY, port } = process.env;

module.exports = {
  loginUserService: async ({ userName = "", email = "", password }) => {
    try {
      let checkValidUser;

      if (userName)
        checkValidUser = await users.findOne({ where: { userName } });

      if (email) checkValidUser = await users.findOne({ where: { email } });

      if (!checkValidUser)
        return { statusCode: 404, message: "User does not exist!!!" };

      const result = await bcrypt.compare(
        String(password),
        checkValidUser.password
      );

      if (result) {
        const token = generateJwt({
          email: checkValidUser.email,
          userName: checkValidUser.userName,
        });

        return {
          name: "token",
          value: token,
          statusCode: 200,
          message: "You have been logged in successfully!!!",
        };
      } else return { statusCode: 401, message: "Password is incorrect!!!" };
    } catch (err) {
      throw err;
    }
  },

  signUpUserService: async ({ password, email, ...rest }) => {
    try {
      const hash = await bcrypt.hash(String(password), 10);
      await users.create({ ...rest, email, password: hash });

      const html = `<html>
                          <body>
                            <div style = 'text-align: center; background-color: cadetblue; color: white; padding: 25px'>
                              <h1>You are now the part of WeConnect ...</h1>
                              <h3>Your Username is : ${rest.userName}</h3>
                              <h3>Your Password is : ${password}</h3>
                            </div>
                          </body>
                        </html>`;

      sendMail({
        to: email,
        subject: "WeConnect Welcome You...",
        html,
      });

      return {
        name: "user",
        value: { ...rest, email },
        statusCode: 201,
        message: "You have been signed up successfully!!!",
      };
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const data = await user.findAll({
        attributes: { exclude: ["password"] },
      });
      if (data)
        return {
          statusCode: 200,
          message: "Data fetched successfully",
          name: "All Users",
          value: data,
        };
      throw new Error("Error fetching user data");
    } catch (error) {
      return { statusCode: 500, message: error.message };
    }
  },

  updateProfileService: async ({ id }, newData) => {
    try {
      const user = await users.findOne({ where: { id } });
      Object.keys(newData).forEach((key) => (user[key] = newData[key]));
      await user.save();
      return {
        statusCode: 201,
        message: "Updated Profile Successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  destroyUserService: async ({ id }) => {
    try {
      const user = await users.findOne({ where: { id } });

      if (user.profilePic) {
        fs.unlink(profilePic, async (err) => {
          if (err) {
            throw err;
          }
          await user.destroy();
          return;
        });
      } else await user.destroy();

      return {
        statusCode: 201,
        message: "Account Deleted Successfully",
      };
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (details) => {
    try {
      const checkUser = await user.findOne({ where: { email: details.email } });
      if (!checkUser)
        return {
          statusCode: 404,
          message: "Email is not registered in this site...",
        };
      const { email, id } = checkUser;
      const resetToken = jwt.sign({ email, id }, RESET_KEY, {
        expiresIn: "1h",
      });
      const mailOptions = {
        from: EMAIL,
        to: checkUser.email,
        subject: "FORGOT PASSWORD LINK",
        html: `<h2>Welcome ${checkUser.fullName}, click on this link in order to reset your password</h2>
        <a href='http://localhost:3000/home/reset_password/${resetToken}'>CLICK HERE</a>`,
      };
      const isEmailSent = await wrappedSendEmail(mailOptions);
      if (isEmailSent)
        return {
          statusCode: 200,
          message:
            "Email sent successfully, click on the link to reset your password.",
        };
      throw new Error("unable to send email");
    } catch (error) {
      return { statusCode: 500, message: error.message };
    }
  },

  resetPassword: async ({ newPassword, token }) => {
    if (!token)
      return { statusCode: 401, message: "Token either invalid or expired!!!" };
    const decoded = jwt.verify(token, RESET_KEY);
    const hash = bcrypt.hashSync(newPassword, 10);
    const updatePassword = await user.update(
      { password: hash },
      { where: { email: decoded.email } }
    );
    if (updatePassword)
      return { statusCode: 200, message: "Password updated successfully!!!" };
  },
  googleSignIn: async (details) => {
    try {
      const {
        emails: [{ value: email }],
      } = details;
      const checkValidUser = await user.findOne({ where: { email } });
      if (!checkValidUser)
        return { statusCode: 404, message: "User does not exist!!!" };
      const token = jwt.sign(
        {
          id: checkValidUser.id,
          email,
          userName: email.split("@")[0],
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      if (token)
        return {
          name: "token",
          value: token,
          statusCode: 200,
          message: "You have been logged in successfully!!!",
        };
      throw new Error("Login Error");
    } catch (error) {
      return { statusCode: 500, message: error.message };
    }
  },
  googleSignUp: async (details) => {
    try {
      const {
        displayName: fullName,
        emails: [{ value: email }],
      } = details;
      const checkExistingUser = await user.findOne({ where: { email } });
      if (checkExistingUser)
        return { statusCode: 422, message: "User already exists!!!" };
      const hash = bcrypt.hashSync(email, 10);
      const data = await user.create({
        fullName,
        userName: email.split("@")[0],
        email,
        password: hash,
      });
      if (data)
        return {
          statusCode: 201,
          message: "You have been signed up successfully!!!",
        };
      throw new Error("Signup Error");
    } catch (error) {
      return { statusCode: 500, message: error.message };
    }
  },
};
