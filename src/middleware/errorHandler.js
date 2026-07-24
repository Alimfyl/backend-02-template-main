const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({
      message: error.message,
    });
  }

  const status = error.status || 500;

  return response.status(status).json({
    message:
      status === 500
        ? "Internal server error"
        : error.message,
  });
};

module.exports = errorHandler;