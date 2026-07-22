const mongoose = require("mongoose");

const User = require("../models/User");
const HttpError = require("../utils/HttpError");

const checkId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, "User not found");
  }
};

const getUsers = async (request, response, next) => {
  try {
    const users = await User.find();
    response.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (request, response, next) => {
  try {
    checkId(request.params.id);

    const user = await User.findById(request.params.id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  try {
    checkId(request.params.id);

    const user = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  try {
    checkId(request.params.id);

    const user = await User.findByIdAndDelete(request.params.id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};