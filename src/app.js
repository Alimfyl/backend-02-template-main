const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(requestLogger);

app.use(
  cors({
    origin: /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
  }),
);

app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;