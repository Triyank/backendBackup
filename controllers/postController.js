const {
  userPostService,
  allPostService,
  destroyPostService,
  newPostService,
} = require("../services");
const { sendFailureResponse, response } = require("../utils/index.js");

module.exports = {
  showAllPosts: async (req, res) => {
    try {
      const responseData = await allPostService();
      response({ res, ...responseData });
    } catch (err) {
      console.log(err);
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  showUserPosts: async (req, res) => {
    try {
      const responseData = await userPostService(req.user);
      if (responseData) response({ res, ...responseData });
    } catch (error) {
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  newPost: async (req, res) => {
    try {
      const responseData = await newPostService(req.user, req.body);

      response({ res, ...responseData });
    } catch (err) {
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  destroyPost: async (req, res) => {
    try {
      const responseData = await destroyPostService(req.user, req.body);
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
};
