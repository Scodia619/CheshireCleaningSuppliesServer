const { PostUserAsync, LoginUserAsync } = require("../Controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.route("/").post(PostUserAsync);
UserRouter.route("/login").post(LoginUserAsync);

module.exports = UserRouter;