const requestLogger = (request, response, next) => {
  console.log(request.originalUrl);
  next();
};

module.exports = requestLogger;