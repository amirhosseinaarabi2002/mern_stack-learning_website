const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");
const { isValidObjectId } = require("mongoose");

exports.banUser = async (req, res) => {
  const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
  const banUserResult = banUserModel.create({ phone: mainUser.phone });

  if (banUserModel) {
    return res.status(200).json({ message: "User is banned successfully :))" });
  }

  return res.status(500).json({ message: "Server Error !!" });
};

exports.getAll = async (req, res) => {
  const allUsers = await userModel.find({});

  res.json(allUsers);
};

exports.removeUser = async (req, res) => {
  const isValidUserID = isValidObjectId(req.params.id);

  if (!isValidUserID) {
    res.status(409).json({
      message: "userID is not valid!",
    });
  }

  const removeUser = await userModel.findByIdAndDelete({ _id: req.params.id });

  if (!removeUser) {
    res.status(404).json({
      message: "there is no user!",
    });
  }

  return res.json({
    message: "user removed successfully!",
  });
};
