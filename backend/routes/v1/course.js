const express = require("express");
const couresController = require("./../../controllers/v1/course");
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
    couresController.create
  );

router
  .route("/:id/sessions")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "video"
    ),
    authMiddleware,
    isAdminMiddleware,
    couresController.createSession
  );

router.route("/sessions").get(couresController.getAllSessions);

router.route("/:href/:sessionID").get(couresController.getSessionInfo);

router
  .route("/sessions/:id")
  .delete(authMiddleware, isAdminMiddleware, couresController.removeSession);

module.exports = router;
