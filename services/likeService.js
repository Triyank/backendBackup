const { posts, likes, transaction, users } = require("../models");

module.exports = {
  likePostService: async ({ id: userId }, { postId }) => {
    const result = await transaction(async (transaction) => {
      try {
        const post = await posts.findOne({ where: { id: postId } });
        if (!post) {
          throw new Error("No Such Post Found");
        }
        const like = await likes.findOne({ where: { postId, userId } });
        let message;

        if (post && like) {
          --post.likes;
          await post.save({ transaction });
          await like.destroy({ transaction });
          message = "Like Removed. X";
        } else {
          ++post.likes;
          await post.save({ transaction });
          await likes.create({ userId, postId }, { transaction });
          message = "Like Added. ";
        }
        return {
          statusCode: 201,
          message,
        };
      } catch (err) {
        throw err;
      }
    });
    return result;
  },

  getLikeService: async ({ postId }) => {
    try {
      if (!postId) throw new Error("no such post found");
      const likeList = await likes.findAll({
        where: { postId },
        include: {
          model: users,
          attributes: ["profilePic", "fullName"],
        },
        attributes: ["userId"],
      });
      if (likeList.length === 0) {
        throw new Error("no likes on this post.");
      }
      return {
        statusCode: 200,
        message: "list of users liked the post.",
        name: "likeList",
        value: likeList,
      };
    } catch (err) {
      throw err;
    }
  },
};
