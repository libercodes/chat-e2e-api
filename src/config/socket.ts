import { Server as ServerIO } from 'socket.io';
import { createServer } from 'http';
import * as dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line import/no-mutable-exports
export let io: ServerIO;

export const initSocketServer = (app: Express.Application) => {
  const server = createServer(app);
  server.listen(process.env.PORT);
  io = new ServerIO(server, {
    cors: {
      origin: process.env.SOCKET_ORIGIN!,
      methods: ['GET', 'POST'],
    },
  });
};
