import APIError from "../utils/API-Errors.js";

export const notFound = (req, res, next) => {
  next(new APIError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Server error";

  if (err instanceof APIError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 400;
    message = `A student with this ${field} already exists`;
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid student ID";
  } else {
    console.error(err);
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors: err.errors || [],
  });
};