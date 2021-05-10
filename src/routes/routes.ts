import { Application } from 'express';
import { input } from '../middleware/logger.middleware';
import { respondNotFoundMiddleware } from '../middleware/notFound.middleware';

export default (app: Application) => {
  app.use(input);
  // API routes from modules

  app.use(respondNotFoundMiddleware);
};
