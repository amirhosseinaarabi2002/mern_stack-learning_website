const express = require("express");
const coursesController = require("./../../controllers/v1/course");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    authMiddleware,
    isAdminMiddleware,
    coursesController.create
  );

router
  .route("/:id/sessions")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "video"
    ),
    authMiddleware,
    isAdminMiddleware,
    coursesController.createSession
  );

router.route("/sessions").get(coursesController.getAllSessions);

router.route("/:href/:sessionID").get(coursesController.getSessionInfo);

router
  .route("/sessions/:id")
  .delete(authMiddleware, isAdminMiddleware, coursesController.removeSession);

router.route("/:id/register").post(authMiddleware, coursesController.register);

router.route("/category/:href").get(coursesController.getCoursesByCategory)
router.route("/:href").get(authMiddleware, coursesController.getOne)

module.exports = router;
