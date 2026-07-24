const express = require("express");

const usersController = require("../controllers/users");
const userBooksController = require("../controllers/userBooks");

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);

router.get("/:id/books", userBooksController.getUserBooks);
router.post("/:id/books", userBooksController.takeBook);
router.delete("/:id/books/:bookId", userBooksController.returnBook);

router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;