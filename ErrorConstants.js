const incorrectDataError = new Error();
incorrectDataError.status = 400;
incorrectDataError.msg = "Incorrect Data Type";

const notFoundError = new Error();
notFoundError.status = 404;
notFoundError.msg = "Data not found"

const conflictDataError = new Error();
conflictDataError.status = 409;
conflictDataError.msg = "A piece of data isnt unique"

const incorrectPasswordError = new Error();
incorrectPasswordError.status = 401;
incorrectPasswordError.msg = "Password is incorrect"

const usernameNotFound = new Error();
usernameNotFound.status = 404
usernameNotFound.message = "Username does not exist"

module.exports = {
    incorrectDataError,
    notFoundError,
    conflictDataError,
    incorrectPasswordError,
    usernameNotFound
}