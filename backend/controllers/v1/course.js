const courseModel = require("./../../models/course");
const categoryModel = require("./../../models/category");
const sessionModel = require("./../../models/session");
const commentModel = require("./../../models/comment");
const courseUserModel = require("./../../models/course-user");

exports.create = async (req, res) => {
  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    categoryID,
  } = req.body;

  const course = await courseModel.create({
    name,
    description,
    creator: req.user._id,
    categoryID,
    support,
    price,
    href,
    status,
    discount,
    cover: req.file.filename,
  });

  const mainCourse = await courseModel
    .findById(course._id)
    .populate("creator", "-password");

  return res.status(201).json(mainCourse);
};

exports.createSession = async (req, res) => {
  const { title, free, time } = req.body;
  const { id } = req.params;

  const session = await sessionModel.create({
    title,
    time,
    free,
    video: req.file.filename,
    course: id,
  });

  return res.status(201).json(session);
};

exports.getAllSessions = async (req, res) => {
  const sessions = await sessionModel
    .find({})
    .populate("course", "name")
    .lean();

  return res.json(sessions);
};

exports.getSessionInfo = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href }).lean();

  const session = await sessionModel.findOne({ _id: req.params.sessionID });

  const sessions = await sessionModel.find({ course: course._id });

  return res.json({ session, sessions });
};

exports.removeSession = async (req, res) => {
  const deletedCourses = await sessionModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedCourses) {
    return res.status(404).json({
      message: "Course not found !!",
    });
  }

  return res.json(deletedCourses);
};

exports.register = async (req, res) => {
  const isUserAlreadyRegistered = await courseUserModel
    .findOne({
      user: req.user._id,
      course: req.params.id,
    })
    .lean();

  if (isUserAlreadyRegistered) {
    return res.status(409).json({
      message: "User already registered in this course",
    });
  }

  const register = await courseUserModel.create({
    user: req.user._id,
    course: req.params.id,
    price: req.body.price,
  });

  return res
    .status(201)
    .json({ message: "You are registered successfully :))" });
};

exports.getCoursesByCategory = async (req, res) => {
  const { href } = req.params;
  const category = await categoryModel.findOne({ href });

  if (category) {
    const categoryCourses = await courseModel.find({
      categoryID: category._id,
    });

    res.json(categoryCourses);
  } else {
    res.json([]);
  }
};

exports.getOne = async (req, res) => {
  const course = await courseModel
    .findOne({ href: req.params.href })
    .populate("creator", "-password -__v")
    .select("-__v");

  const sessions = await sessionModel.find({ course: course._id }).lean();
  const comments = await commentModel
    .find({ course: course._id, isAccept: 1 })
    .populate("creator", "-password")
    .lean();
  const courseStudentCount = await courseUserModel
    .find({ course: course._id })
    .countDocuments();

  const isUserRegisteredToThisCourse = !!(await courseUserModel.findOne({
    user: req.user._id,
    course: course._id,
  }));

  res.json({
    course: course,
    sessions: sessions,
    comments: comments,
    courseStudentCount: courseStudentCount,
    isUserRegisteredToThisCourse: isUserRegisteredToThisCourse,
  });
};
