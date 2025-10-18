const commentsModel = require("../../models/comment")
const coursesModel = require("../../models/course")

exports.create = async (req, res) => {
  const { body, courseHref, score } = req.body;

  const course = await coursesModel.findOne({ href: courseHref }).lean();

  const comment = await commentsModel.create({
    body,
    course: course._id,
    creator: req.user._id,
    score,
    isAnswer: 0,
    isAccept: 0, // 1 => show as public
  });

  return res.status(201).json(comment);
};