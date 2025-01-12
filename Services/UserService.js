const { conflictDataError, incorrectDataError, usernameNotFound, incorrectPasswordError } = require("../ErrorConstants");
const { SelectUserByUsername, SelectUserByEmail, InsertUserAsync, UpdateUserByUsername } = require("../Repositories/UserRepository");
const { EncryptPassword, VerifyPassword } = require("../Utils/Passwords");

exports.CreateNewUserAsync = async (request) => {

    const {username, email, phone, address, postcode, password} = request.body

    if ([username, email, phone, address, postcode, password].some(value => value == null || typeof value !== 'string')) {
        throw incorrectDataError;
    }

    const usernameExists = await SelectUserByUsername(username);
    const emailExists = await SelectUserByEmail(email);

    if(usernameExists || emailExists){
        throw conflictDataError;
    }

    var hashedPassword = await EncryptPassword(password)

    const newUser = {
        username,
        email,
        phone,
        address,
        postcode,
        password: hashedPassword,
        admin: false
    };

    return await InsertUserAsync(newUser);

}

exports.LoginUserAsync = async (request) => {
    const {username, password} = request.body;

    if ([username, password].some(value => value == null || typeof value !== 'string')) {
        throw incorrectDataError;
    }

    const user = await SelectUserByUsername(username);

    if(!user){
        throw usernameNotFound;
    }

    var verifyPassword = await VerifyPassword(password, user.password);

    if(!verifyPassword){
        throw incorrectPasswordError;
    }

    return user;
    
}

exports.UpdateUserByUsernameAsync = async (request) => {
    const {username, email, phone, address, postcode, password,} = request.body;

    if ([username, email, phone, address, postcode, password].some(value => value == null || typeof value !== 'string')) {
        throw incorrectDataError;
    }

    const user = await SelectUserByUsername(username);

    if(!user){
        throw usernameNotFound;
    }

    const userData = {
        username,
        email,
        phone,
        address,
        postcode,
        password
    }

    return await UpdateUserByUsername(userData);
}