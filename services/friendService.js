const { friends } = require("../models");

module.exports = {
  sendFrndReqService: async ({ id: user1 }, { id: user2 }) => {
    try {
      const frndRequest = await friends.create({
        user1,
        user2,
      });
      return {
        statusCode: 201,
        message: "Friend Request Sent.",
        name: "Friend Request Details",
        value: frndRequest,
      };
    } catch (err) {
      throw err;
    }
  },

  acceptFrndReqService: async ({ id: user2 }, { id: user1 }) => {
    try {
      const frndRequest = await friends.update(
        { accepted: true },
        { where: { user1, user2 } }
      );
      return {
        statusCode: 201,
        message: "Friend Request accepted.",
        name: "Friend Request Details",
        value: frndRequest,
      };
    } catch (err) {
      throw err;
    }
  },

  declineFrndReqService: async ({ id: user2 }, { id: user1 }) => {
    try {
      const request = await friends.findOne({ where: { user1, user2 } });
      request.destroy();
      return {
        statusCode: 201,
        message: "Request Deleted.",
      };
    } catch (err) {
      throw err;
    }
  },

  cancelfrndReqservice: async ({ id: user1 }, { id: user2 }) => {
    const request = await friends.findOne({ where: { user1, user2 } });
    request.destroy();

    return {
      statusCode: 201,
      message: "Requst Cancelled",
    };
  },
};
