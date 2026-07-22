const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [20, "Name must contain no more than 20 characters"],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      minlength: [2, "Surname must contain at least 2 characters"],
      maxlength: [20, "Surname must contain no more than 20 characters"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [5, "Username must contain exactly 5 characters"],
      maxlength: [5, "Username must contain exactly 5 characters"],
      trim: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
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

module.exports = mongoose.model("User", userSchema);