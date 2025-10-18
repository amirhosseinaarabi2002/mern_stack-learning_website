const courseModel = require("./../../models/course");
const sessionModel = require("./../../models/session");

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

