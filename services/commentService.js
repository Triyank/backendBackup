const { comments } = require("../models");

module.exports = {
  createCommentService: async ({ id }, { postId, text }) => {
    try {
      const newComment = await comments.create({ userId: id, postId, text });
      if (newComment)
        return {
          statusCode: 201,
          name: "comment",
          value: comment,
          message: "Comment Created.",
        };
      else throw new Error("Error in adding a comment.");
    } catch (err) {
      throw err;
    }
  },

  deleteCommentService: async ({ id: userId }, { id }) => {
    try {
      const deleteComment = await comments.destroy({ where: { id, userId } });
      if (!deleteComment)
        throw new Error(
          "Either this Comment does not exist anymore or User not valid"
        );

      return {
        statusCode: 202,
        message: "Comment Deleted.",
      };
    } catch (err) {
      throw err;
    }
  },
  updateCommentService: async function ({ id, text, userId }) {
    try {
      const comment = await comments.update(
        { text },
        { where: { id, userId } }
      );
      if (!comment)
        throw new Error(
          "Either this Comment does not exist anymore or User not valid"
        );

      return {
        statusCode: 202,
        message: "comment Updated.",
        name: "comment",
        value: comment,
      };
    } catch (err) {
      throw err;
    }
  },

  postCommentsService: async ({ postId }) => {
    try {
      const data = await comments.findOne({ where: { postId } });
      if (data)
        return {
          statusCode: 200,
          message: "Comments on Post.",
          name: "Comments",
          value: data,
        };
      else throw new Error("Error in fetching your comments.");
    } catch (err) {
      throw err;
    }
  },
};
