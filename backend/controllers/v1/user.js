const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");

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

exports.changeRole = async (req, res) => {
  const { id } = req.body;

  const isValidUserID = isValidObjectId(id);

  if (!isValidUserID) {
    res.status(409).json({
      message: "userID is not valid!",
    });
  }

  const user = await userModel.findOne({ _id: id });

  let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  // console.log(newRole);
  const updatedRole = await userModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { role: newRole }
  );

  if (updatedRole) {
    return res.json({
      message: "user role changed successfully!",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, username, name, phone, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel
    .findByIdAndUpdate(
      { _id: id },
      { email, username, name, phone, password: hashedPassword }
    )
    .select("-password")
    .lean();

  return res.json(user);
};
