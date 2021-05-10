import { Socket } from 'socket.io';
import { io } from '../../config/socket';
import logger from '../../helpers/logger.helper';
import { EnumBESocketEvents, EnumSocketClientEvents } from '../../types/types';
/* import {
  Message as MessageProto,
  DisconnectEvent as DisconnectEventProto,
} from '../../config/proto/bundle.js'; */

const streamChatMessages = (socket: Socket, roomCode: string) => {
  socket.on(EnumBESocketEvents.BE_MESSAGE, (message: Uint8Array) => {
    io.to(roomCode).emit(EnumSocketClientEvents.MESSAGE, message);
  });

  socket.on(EnumBESocketEvents.BE_DISCONNECT, (data: Uint8Array) => {
    io.to(roomCode).emit(EnumSocketClientEvents.DISCONNECT, data);
  });
};

export const setClientSocketEvents = () => {
  io.on('connection', (socket: Socket) => {
    socket.on('join-chat', (code: string) => {
      logger.info(`A user joined room with code ${code}`);
      socket.join(code);
      streamChatMessages(socket, code);
    });
  });
};
