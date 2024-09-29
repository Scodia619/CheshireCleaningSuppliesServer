const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.SelectAllTags = async () => {
    const tags = await prisma.tags.findMany()
    return tags
}

exports.SelectUniqueTag = async (name) => {
    return await prisma.tags.findFirstOrThrow(
        {
            where: {
                tag_name: name
            }
        }
    )
}

exports.InsertTag = async (tagName) => {
    const tag = await prisma.tags.create({
        data: {
            tag_name: tagName
        }})
    return tag;
}