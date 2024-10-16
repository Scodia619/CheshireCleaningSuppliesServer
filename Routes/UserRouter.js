const { PostUserAsync } = require("../Controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.route("/").post(PostUserAsync)

module.exports = UserRouter;