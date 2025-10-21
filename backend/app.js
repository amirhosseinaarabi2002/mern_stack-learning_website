const express = require("express");
const authRouter = require("./routes/v1/auth");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/v1/user");
const categoriesRouter = require("./routes/v1/category");
const coursesRouter = require("./routes/v1/course");
const commentsRouter = require("./routes/v1/comment");
const contactsRouter = require("./routes/v1/contact");
const newsletterRouter = require("./routes/v1/newsletter");
const searchRouter = require("./routes/v1/search");
const notificationsRouter = require("./routes/v1/notification");

const app = express();
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/category", categoriesRouter);
app.use("/v1/courses", coursesRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/contacts", contactsRouter);
app.use("/v1/newsletters", newsletterRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/notifications", notificationsRouter);

module.exports = app;
