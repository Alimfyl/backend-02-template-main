const express = require("express");

const booksController = require("../controllers/books");

const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/", booksController.createBook);

router.get("/:id", booksController.getBookById);
router.patch("/:id", booksController.updateBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;