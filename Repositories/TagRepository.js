const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.SelectAllTags = async () => {
    const tags = await prisma.tags.findMany()
    return tags
}

exports.SelectUniqueTag = async (name) => {
    const tag = await prisma.tags.findUnique(
        {
            where: {
                tag_name: name
            }
        }
    )
    return tag
}

exports.InsertTag = async (tagName) => {
    const tag = await prisma.tags.create({
        data: {
            tag_name: tagName
        }})
    return tag;
}