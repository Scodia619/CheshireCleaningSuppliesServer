const bcrypt = require('bcrypt');

exports.EncryptPassword = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }catch (err){
        throw err;
    }
}

exports.VerifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw err;
    }
}