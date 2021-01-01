const {
  sendFrndReqService,
  acceptFrndReqService,
  declineFrndReqService,
  cancelfrndReqservice,
} = require("../services/friendService");
const { sendFailureResponse, response } = require("../utils");

module.exports = {
  sendFrndReq: async (req, res) => {
    try {
      const responseData = await sendFrndReqService(req.user, req.body);
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

  acceptFrndReq: async (req, res) => {
    try {
      const responseData = await acceptFrndReqService(req.user, req.body);
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

  declineFrndReq: async (req, res) => {
    try {
      const responseData = await declineFrndReqService(req.user, req.body);
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

  cancelfrndReq: async (req, res) => {
    try {
      const responseData = await cancelfrndReqservice(req.user, req.body);
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
