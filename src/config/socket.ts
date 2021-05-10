import { Server as ServerIO } from 'socket.io';
import { Server } from 'http';

// eslint-disable-next-line import/no-mutable-exports
export let io: ServerIO;

export const initSocketServer = (app: Express.Application) => {
  const server = new Server(app);
  io = new ServerIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
};
