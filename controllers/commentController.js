const {
  updateCommentService,
  createCommentService,
  deleteCommentService,
  postCommentsService,
} = require("../services");
const { sendFailureResponse, response } = require("../utils/index.js");

module.exports = {
  createComment: async function (req, res) {
    try {
      const responseData = await createCommentService(req.user, req.body);
      response({ res, ...responseData });
    } catch (err) {
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  deleteComment: async function (req, res) {
    try {
      const responseData = await deleteCommentService(req.user, req.body);
      response({ res, ...responseData });
    } catch (err) {
      sendFailureResponse({
        statusCode: 500,
        message: err.message,
        res,
      });
    }
  },

  updateComment: async (req, res) => {
    try {
      const responseData = await updateCommentService({
        ...req.body,
        userId: req.user.id,
      });
      response({ res, ...responseData });
    } catch (err) {
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },

  postComments: async (req, res) => {
    try {
      const responseData = await postCommentsService(req.body);
      response({ res, ...responseData });
    } catch (err) {
      sendFailureResponse({
        res,
        message: err.message,
        statusCode: 500,
      });
    }
  },
};
