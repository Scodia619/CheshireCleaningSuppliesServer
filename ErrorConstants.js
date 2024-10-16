const incorrectDataError = new Error();
incorrectDataError.status = 400;
incorrectDataError.msg = "Incorrect Data Type";

const conflictDataError = new Error();
conflictDataError.status = 409;
conflictDataError.message = "A piece of data isnt unique"

module.exports = {
    incorrectDataError,
    conflictDataError
}