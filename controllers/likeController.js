const { sendFailureResponse, response } = require("../utils/index.js");
const { likePostService, getLikeService } = require("../services");

module.exports = {
  likePost: async (req, res) => {
    try {
      const responseData = await likePostService(req.user, req.body);
      response({ res, ...responseData });
    } catch (err) {
      console.log(err);
      sendFailureResponse({
        statusCode: 500,
        message: err.message,
        res,
      });
    }
  },
  getLike: async (req, res) => {
    try {
      const responseData = await getLikeService(req.body);
      response({ res, ...responseData });
    } catch (err) {
      console.log(err);
      sendFailureResponse({
        statusCode: 500,
        message: err.message,
        res,
      });
    }
  },
};
