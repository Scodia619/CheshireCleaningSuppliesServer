const { GetAllTags, GetUniqueTag, PostTag } = require("../Controllers/TagController");

const TagRouter = require("express").Router();

TagRouter.route("/").get(GetAllTags).post(PostTag)
TagRouter.route("/:tagName").get(GetUniqueTag)

module.exports = TagRouter;