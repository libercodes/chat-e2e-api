import { Socket } from 'socket.io';
import { io } from '../../config/socket';
import logger from '../../helpers/logger.helper';
import { EnumBESocketEvents, EnumSocketClientEvents } from '../../types/types';

export const streamChatMessages = (socket: Socket, roomCode: string) => {
  socket.on(EnumBESocketEvents.BE_ADD_MESSAGE, (message: any) => {
    logger.warn(message);
    io.to(roomCode).emit(EnumSocketClientEvents.ADD_MESSAGE, message);
  });

  socket.on(EnumBESocketEvents.BE_DISCONNECT, (data: any) => {
    io.to(roomCode).emit(EnumSocketClientEvents.DISCONNECT, data);
  });
};

export const setClientSocketEvents = () => {
  io.on('connection', (socket: Socket) => {
    console.log('socket joined');
    socket.on('join', (code: string) => {
      logger.info(`A user joined room with code ${code}`);
      socket.join(code);
      streamChatMessages(socket, code);
    });
  });
};
