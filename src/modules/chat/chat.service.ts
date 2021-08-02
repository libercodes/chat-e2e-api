import { Socket } from 'socket.io';
import { io } from '../../config/socket';
import logger from '../../helpers/logger.helper';
import { EnumBESocketEvents, EnumSocketClientEvents } from '../../types/types';
import { Store } from './store';

const streamChatMessages = (client: Socket, roomCode: string) => {
  const store = Store.getInstance();

  client.on(EnumBESocketEvents.BE_ADD_MESSAGE, (message: any) => {
    logger.warn(message);
    store.updateRoomLastActivity(roomCode);

    io.to(roomCode).emit(EnumSocketClientEvents.ADD_MESSAGE, message);
  });

  client.on(EnumBESocketEvents.BE_DISCONNECT, (data: any) => {
    io.to(roomCode).emit(EnumSocketClientEvents.DISCONNECT, data);
    store.removeParticipant(roomCode);
    client.leave(roomCode);
    client.disconnect(true);
  });
};

export const setClientSocketEvents = () => {
  const store = Store.getInstance();

  io.on('connection', (client: Socket) => {
    client.on('join', (code: string) => {
      const room = store.findRoom(code);

      if (!room) {
        client.emit('exception', 'Room not found');
        return;
      }

      logger.info(`A user joined room with code ${code}`);
      store.addParticipant(code);
      client.join(code);

      streamChatMessages(client, code);
    });
  });
};
