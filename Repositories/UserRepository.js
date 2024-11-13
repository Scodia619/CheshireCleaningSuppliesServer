const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.InsertUserAsync = async (user) => {
    return await prisma.user.create({data: user})
}

exports.SelectUserByUsername = async (username) => {
    var result = await prisma.user.findUnique({where: {username: username}});
    return result;
}

exports.SelectUserByEmail = async (email) => {
    var result = await prisma.user.findMany({where: {email: email}});
    return result.length > 0;
}

exports.SelectUserById = async (id) => {
    return await prisma.user.findUnique({where: {user_id: id}})
}