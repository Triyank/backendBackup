const express = require("express");

const {
  sendFrndReq,
  acceptFrndReq,
  declineFrndReq,
  cancelfrndReq,
} = require("../controllers/friendsController");

const {
  cors,
  json,
  logger,
  passport,
  urlencoded,
  authenticate,
  _passport,
  isLoggedIn,
} = require("../middlewares");

const {
  getLike,
  newPost,
  likePost,
  loginUser,
  myProfile,
  signUpUser,
  destroyUser,
  destroyPost,
  getAllUsers,
  uploadMedia,
  postComments,
  showAllPosts,
  showUserPosts,
  updateComment,
  createComment,
  deleteComment,
  updateProfile,
  googleSignUpUser,
  googleSignInUser,
  uploadProfilePic,
  resetPasswordUser,
  forgotPasswordUser,
} = require("../controllers");

const {
  result,
  postValidations,
  signUpValidation,
  commentValidations,
  profileUpdateValidations,
  updatePasswordValidations,
} = require("../validator");

let reqType;
const router = express.Router();

// MiddleWares
router.use(cors);
router.use(passport);
router.use(logger);
router.use(json);
router.use(urlencoded);

//Users EndPoints
router.get("/myprofile", authenticate, myProfile);
router.get("/all_users", authenticate, getAllUsers);
router.put(
  "/users/reset_password",
  updatePasswordValidations,
  result,
  resetPasswordUser
);
router.post("/signup", signUpValidation, result, signUpUser);
router.post("/users/forgot_password", forgotPasswordUser);
router.post("/login", loginUser);

router.put(
  "/update_profile",
  authenticate,
  profileUpdateValidations,
  result,
  uploadProfilePic,
  updateProfile
);
router.delete("/user", authenticate, destroyUser);

router.get(
  "/users/signup/auth/google",
  (req, res, next) => {
    reqType = req.url.split("/")[2];
    next();
  },
  _passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/users/login/auth/google",
  (req, res, next) => {
    reqType = req.url.split("/")[2];
    next();
  },
  _passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/users/auth/google/redirect",
  _passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    reqType === "signup"
      ? res.redirect("/users/google_signup")
      : res.redirect("/users/google_login");
  }
);
router.get("/users/google_signup", isLoggedIn, googleSignUpUser);
router.get("/users/google_login", isLoggedIn, googleSignInUser);
router.get("/", (req, res) => res.send("Welcome to weconnect(donut)!!!"));
router.get("/failed", (req, res) => res.send("You Failed to log in!"));
router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
});

//Posts Endpoints
router.get("/posts/get_all_posts", authenticate, showAllPosts);
router.get("/posts/my_posts", authenticate, showUserPosts);
router.post(
  "/posts/create",
  authenticate,
  uploadMedia,
  postValidations,
  result,
  newPost
);
router.delete("/posts/delete", authenticate, destroyPost);

//comment Endpoints
router.post(
  "/add_comment",
  authenticate,
  commentValidations,
  result,
  createComment
);
router.put(
  "/update_comment",
  authenticate,
  commentValidations,
  result,
  updateComment
);
router.delete("delete_comment", authenticate, deleteComment);
router.get("/all_comments", authenticate, postComments);

// likes Endpoints
router.post("/like", authenticate, likePost);
router.get("/get_like", authenticate, getLike);

// friend requests endpoints
router.post("/frnd_request/send", authenticate, sendFrndReq);
router.put("/frnd_request/accept", authenticate, acceptFrndReq);
router.delete("/frnd_request/decline", authenticate, declineFrndReq);
router.delete("/frnd_request/cancel", authenticate, cancelfrndReq);

// router.get('/frnds/posts', authenticate, getUserPost) 

module.exports = { router, express };
