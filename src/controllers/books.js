const mongoose = require("mongoose");

const Book = require("../models/Book");
const HttpError = require("../utils/HttpError");

const checkId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, "Book not found");
  }
};

const getBooks = async (request, response, next) => {
  try {
    const books = await Book.find();
    response.json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (request, response, next) => {
  try {
    checkId(request.params.id);

    const book = await Book.findById(request.params.id);

    if (!book) {
      throw new HttpError(404, "Book not found");
    }

    response.json(book);
  } catch (error) {
    next(error);
  }
};

const createBook = async (request, response, next) => {
  try {
    const book = await Book.create(request.body);
    response.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (request, response, next) => {
  try {
    checkId(request.params.id);

    const book = await Book.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!book) {
      throw new HttpError(404, "Book not found");
    }

    response.json(book);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (request, response, next) => {
  try {
    checkId(request.params.id);

    const book = await Book.findByIdAndDelete(request.params.id);

    if (!book) {
      throw new HttpError(404, "Book not found");
    }

    response.json(book);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};