const { PostUserAsync, LoginUserAsync, UpdateUserByUsername } = require("../Controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.route("/").post(PostUserAsync).patch(UpdateUserByUsername);
UserRouter.route("/login").post(LoginUserAsync);

module.exports = UserRouter;