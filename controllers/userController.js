const {
  resetPassword,
  forgotPassword,
  loginUserService,
  signUpUserService,
  destroyUserService,
  updateProfileService,
  getAll,
  googleSignIn,
  googleSignUp,
} = require("../services");
const { sendFailureResponse, response } = require("../utils");

module.exports = {
  signUpUser: async ({ body }, res) => {
    try {
      const responseData = await signUpUserService(body);
      response({ res, ...responseData });
    } catch (err) {
      console.error(err);
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const responseData = await loginUserService(req.body);
      response({ res, ...responseData });
    } catch (err) {
      console.error(err);
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  forgotPasswordUser: async (req, res) => {
    try {
      let responseData = await forgotPassword(req.body);
      response({
        res,
        message: responseData.message,
        statusCode: responseData.statusCode,
        name: responseData.name,
        value: responseData.value,
        count: responseData.count,
        errors: [],
      });
    } catch (error) {
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  resetPasswordUser: async (req, res) => {
    try {
      let responseData = await resetPassword(req.body);
      response({
        res,
        message: responseData.message,
        statusCode: responseData.statusCode,
        name: responseData.name,
        value: responseData.value,
        count: responseData.count,
        errors: [],
      });
    } catch (error) {
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  destroyUser: async (req, res) => {
    try {
      const responseData = await destroyUserService(req.user);
      response({ res, ...responseData });
    } catch (err) {
      console.error(err);
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const responseData = await updateProfileService(req.user, req.body);
      response({ res, ...responseData });
    } catch (error) {
      console.log(error);
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      let responseData = await getAll();
      response({ res, ...responseData });
    } catch (error) {
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  myProfile: async (req, res) => {
    res.send(req.user);
  },

  googleSignInUser: async (req, res) => {
    try {
      let responseData = await googleSignIn(req.user);
      response({ res, ...responseData });
    } catch (error) {
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },

  googleSignUpUser: async (req, res) => {
    try {
      let responseData = await googleSignUp(req.user);
      response({ res, ...responseData });
    } catch (error) {
      sendFailureResponse({
        res,
        message: error.message,
        statusCode: 500,
      });
    }
  },
};
