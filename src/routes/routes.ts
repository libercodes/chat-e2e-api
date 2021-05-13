import { Application } from 'express';
import { input } from '../middleware/logger.middleware';
import { respondNotFoundMiddleware } from '../middleware/notFound.middleware';
import chatRouter from '../modules/chat/chat.routes';

export default (app: Application) => {
  app.use(input);
  app.use(chatRouter);
  // API routes from modules

  app.use(respondNotFoundMiddleware);
};
