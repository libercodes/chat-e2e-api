import { RequestHandler } from 'express';

export const respondNotFoundMiddleware: RequestHandler = (req, res, next) => {
  const message = 'Resource not found';
  res.status(404);
  res.json({ status: false, message });
};
