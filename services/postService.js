const { posts, comments, transaction, likes } = require("../models");
const path = require("path");
const fs = require("fs");

module.exports = {
  newPostService: async ({ id }, _post) => {
    try {
      const post = {
        userId: id,
        ..._post,
        createdBy: id,
      };

      await posts.create(post);

      return {
        statusCode: 201,
        message: "New Post Created !!!",
      };
    } catch (err) {
      return { statusCode: 500, message: err.message };
    }
  },

  destroyPostService: async (user, { id }) => {
    const result = await transaction(async (transaction) => {
      try {
        const post = await posts.findOne({ where: { id } });
        const allComments = await comments.findAll({ where: { postId: id } });
        const allLikes = await likes.findAll({ where: { postId: id } });

        if (!post) {
          throw new Error("No Such Post Found !!!");
        }

        if (post.userId !== user.id) {
          throw new Error("You are not a Valid User !!!");
        }

        if (post.media) {
          fs.unlink(path.join(__dirname, "../", post.media), (err) => {
            if (err) console.log(err);
          });
          // await deleteFile(post.media);
        }

        allComments.forEach((comment) => {
          comment.destroy({ transaction }).catch((err) => {
            throw err;
          });
        });
        allLikes.forEach((like) => {
          like.destroy({ transaction }).catch((err) => {
            throw err;
          });
        });
        await post.destroy({ transaction });

        return {
          statusCode: 201,
          message: "Post Deleted ( likes and comments also. ) !!!",
        };
      } catch (err) {
        throw err;
      }
    });
    return result;
  },

  allPostService: async () => {
    try {
      const showPost = await posts.findAll();

      return {
        statusCode: 200,
        message: "Posts Displayed !!!",
        name: "posts",
        value: showPost,
      };
    } catch (err) {
      throw err;
    }
  },

  userPostService: async ({ id }) => {
    try {
      const userPosts = await posts.findAll({ where: { userId: id } });
      return {
        message: "user's posts displayed",
        statusCode: 200,
        name: "posts",
        value: userPosts,
      };
    } catch (err) {
      throw err;
    }
  },
};
