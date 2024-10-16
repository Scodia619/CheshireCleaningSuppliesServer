const { CreateNewUserAsync } = require("../Services/UserService");

exports.PostUserAsync = async (req, res, next) => {
    try {
      const user = await CreateNewUserAsync(req);
      if(user.error) throw user.error;
      return res.status(200).send({user});
    } catch (err) {
      next(err);
    }
  };