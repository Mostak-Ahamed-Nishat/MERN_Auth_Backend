const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`This ${req.originalUrl} - url doesn't exist`);
  res.status(404);
  next(error);
};

const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.status === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource or db not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFoundMiddleware, errorMiddleware };
