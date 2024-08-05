const { SelectAllTags, SelectUniqueTag, InsertTag } = require("../Repositories/TagRepository")

exports.GetAllTags = async (req, res, next) => {
    const tags = await SelectAllTags();
    return res.status(200).send({tags})
}

exports.GetUniqueTag = async (req, res, next) => {
    const {tagName} = req.params;
    if(!isNaN(parseInt(tagName))){
        return res.status(400).send({message: "Invalid Data Type for TagName"})
    }
    
    const tag = await SelectUniqueTag(tagName);
        
    if(!tag){
        return res.status(404).send({message: "No tag found"});
    }
    return res.status(200).send({tag})
}

exports.PostTag = async (req, res, next) => {
    const {tag_name} = req.body;
    if(!tag_name || !isNaN(parseInt(tag_name))){
        return res.status(400).send({message: "Invalid Data Type for TagName"})
    }
    const tagCheck = await SelectUniqueTag(tag_name);
    if(tagCheck){
        return res.status(400).send({message: "Tag Name already exists"})
    }
    const tag = await InsertTag(tag_name);
    return res.status(201).send({tag})
}