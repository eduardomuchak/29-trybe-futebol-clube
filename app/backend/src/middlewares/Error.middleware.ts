import { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });

  next();
};

export default errorHandlerMiddleware;
