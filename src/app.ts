import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import routes from './routes/routes';
import { initSocketServer } from './config/socket';
import { setClientSocketEvents } from './modules/chat/chat.service';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
const server = initSocketServer(app);
setClientSocketEvents();

routes(app);

server.listen(port, async () => {
  // eslint-disable-next-line
  console.log(`Service running on port ${port}`);
});
