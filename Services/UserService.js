const { conflictDataError, incorrectDataError } = require("../ErrorConstants");
const { SelectUserByUsername, SelectUserByEmail, InsertUserAsync } = require("../Repositories/UserRepository");
const { EncryptPassword } = require("../Utils/Passwords");

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
        password: hashedPassword
    };

    return await InsertUserAsync(newUser);

}