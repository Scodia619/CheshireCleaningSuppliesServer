const { SelectAllTags, SelectUniqueTag, InsertTag } = require("../Repositories/TagRepository")
const { GetAllTagsAsync, GetUniqueTag, PostTag } = require("../Services/TagService")

exports.GetAllTags = async (req, res, next) => {
    const tags = await GetAllTagsAsync();
    return res.status(200).send({tags})
}

exports.GetUniqueTag = async (req, res, next) => {
    const tag = await GetUniqueTagAsync(request)
    return res.status(200).send({tag})
}

exports.PostTag = async (req, res, next) => {
    const tag = await PostTagAsync(request);
    return res.status(201).send({tag})
}