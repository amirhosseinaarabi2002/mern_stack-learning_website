const userModel = require("../../models/user");

const registerValidator = require("../../validators/register");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult != true) {
    return res.status(422).json(validationResult);
  }

  const { username, name, password, email, phone } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if(isUserExist){
    return res.status(409).json({
        message: "username or email is duplicated!"
    })
  }
};

exports.login = async (req, res) => {};

exports.getMe = async (req, res) => {};
