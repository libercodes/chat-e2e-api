import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes/routes';
import { initSocketServer } from './config/socket';
import { setClientSocketEvents } from './modules/chat/chat.service';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
initSocketServer(app);
setClientSocketEvents();

routes(app);

app.listen(port, async () => {
  // eslint-disable-next-line
  console.log(`Service running on port ${port}`);
});
