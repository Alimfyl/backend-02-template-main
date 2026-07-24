const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must contain at least 2 characters"],
      maxlength: [20, "Title must contain no more than 20 characters"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      minlength: [2, "Author must contain at least 2 characters"],
      maxlength: [20, "Author must contain no more than 20 characters"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(document, result) {
        delete result._id;
      },
    },
  },
);

module.exports = mongoose.model("Book", bookSchema);