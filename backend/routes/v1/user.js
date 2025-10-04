const express = require("express");
const userController = require("./../../controllers/v1/user");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");

const router = express.Router();

router
  .route("/ban/:id")
  .post(authMiddleware, isAdminMiddleware, userController.banUser);

router.route("/").get(authMiddleware, isAdminMiddleware, userController.getAll);

router
  .route("/update-profile/:id")
  .put(authMiddleware, userController.updateUser);
router
  .route("/role")
  .put(authMiddleware, isAdminMiddleware, userController.changeRole);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, userController.removeUser);

module.exports = router;
