const mongoose = require("mongoose");

const User = require("../models/User");
const Book = require("../models/Book");
const HttpError = require("../utils/HttpError");

const checkId = (id, entityName) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, `${entityName} not found`);
  }
};

const getUserBooks = async (request, response, next) => {
  try {
    checkId(request.params.id, "User");

    const user = await User.findById(request.params.id).populate("books");

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    response.json(user.books);
  } catch (error) {
    next(error);
  }
};

const takeBook = async (request, response, next) => {
  try {
    checkId(request.params.id, "User");
    checkId(request.body.bookId, "Book");

    const user = await User.findById(request.params.id);
    const book = await Book.findById(request.body.bookId);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    if (!book) {
      throw new HttpError(404, "Book not found");
    }

    const alreadyTaken = user.books.some((id) => id.equals(book._id));

    if (!alreadyTaken) {
      user.books.push(book._id);
      await user.save();
    }

    response.status(201).json({
      bookId: book.id,
      book,
    });
  } catch (error) {
    next(error);
  }
};

const returnBook = async (request, response, next) => {
  try {
    checkId(request.params.id, "User");
    checkId(request.params.bookId, "Book");

    const user = await User.findById(request.params.id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const bookIndex = user.books.findIndex((id) =>
      id.equals(request.params.bookId),
    );

    if (bookIndex === -1) {
      throw new HttpError(404, "Book not found for this user");
    }

    user.books.splice(bookIndex, 1);
    await user.save();

    response.json({
      bookId: request.params.bookId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserBooks,
  takeBook,
  returnBook,
};