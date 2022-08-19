import { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ message });
};

export default errorHandlerMiddleware;
