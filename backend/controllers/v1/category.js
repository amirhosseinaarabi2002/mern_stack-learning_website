const categoryModel = require("./../../models/category");

exports.create = async (req, res) => {
  const { title, href } = req.body;
  const category = await categoryModel.create({ title, href });

  return res.status(201).json(category);
};

exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  return res.json(categories);
};

exports.remove = async (req, res) => {
  // ...
};

exports.update = async (req, res) => {
  // ...
};
