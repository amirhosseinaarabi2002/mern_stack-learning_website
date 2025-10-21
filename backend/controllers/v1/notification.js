const notificationModel = require("./../../models/notification");

exports.create = async (req, res) => {
  const { message, admin } = req.body;
  // Validate
  const notification = await notificationModel.create({ message, admin });

  return res.status(201).json(notification);
};

exports.get = async (req, res) => {
  const { _id } = req.user;

  const adminNotifications = await notificationModel.find({ admin: _id });
  return res.json(adminNotifications);
};

exports.seen = async (req, res) => {
  // Coding
};

exports.getAll = async (req, res) => {
  const notifications = await notificationModel.find({});
  return res.json(notifications);
};

exports.remove = async (req, res) => {
  // Remove ...
};
