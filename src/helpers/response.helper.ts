import { RequestHandler } from 'express-serve-static-core';

export const respondNotFound = (res: any, customMessage?: string) => {
  const defaultMessage = 'Resource not found';
  const message = customMessage || defaultMessage;
  res.status(404);
  res.json({ status: false, message });
};

export const respondData = (res: any, data: any, message: string, status?: number) => {
  res.status(status || 200);
  res.json({
    status: true,
    message,
    data,
  });
};
