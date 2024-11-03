const { incorrectDataError, notFoundError, conflictDataError } = require("../ErrorConstants");
const { SelectAllTags, SelectUniqueTag, InsertTag } = require("../Repositories/TagRepository")

exports.GetAllTagsAsync = async () => {
    const tags = await SelectAllTags();
    return tags;
}

exports.GetUniqueTagAsync = async (request) => {
    const {tagName} = request.params;
    if(!isNaN(parseInt(tagName))){
        throw incorrectDataError;
    }
    
    const tag = await SelectUniqueTag(tagName);
        
    if(!tag){
        throw notFoundError;
    }

    return tag;
}

exports.PostTagAsync = async (request) => {
    const {tag_name} = request.body;
    if(!tag_name || !isNaN(parseInt(tag_name))){
        throw incorrectDataError;
    }
    const tagCheck = await SelectUniqueTag(tag_name);
    if(tagCheck){
        throw conflictDataError;
    }
    return await InsertTag(tag_name);
}