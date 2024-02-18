// Error fun

const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

// middleware not found

const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// middleware error Handler

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    status: "fail",
    message: err?.message,
    stack: err?.stack,
  });
};

export { errorHandler, notFound, createError };
