import { RequestHandler } from 'express';
import { v4 } from 'uuid';
import { respondData, respondNotFound } from '../../helpers/response.helper';
import { Room } from '../../models/room';
import { Store } from './store';

export const createChatRoom: RequestHandler = (req, res, next) => {
  const store = Store.getInstance();

  const code = v4();
  const { isPublic, name } = req.body;
  const startedAt = new Date();

  const room: Room = {
    name: name || `Room#${code}`,
    code,
    startedAt,
    isPublic,
    participants: 0,
    lastActivity: startedAt,
  };
  store.addRoom(room);

  respondData(res, room, 'Chat room created', 201);
};

export const getChatRoom: RequestHandler = (req, res, next) => {
  const store = Store.getInstance();
  const { code } = req.params;

  const foundRoom = store.findRoom(code);
  if (!foundRoom) respondNotFound(res, `Chat room with code ${code} not found`);

  respondData(res, foundRoom, `Joining to chat room with code ${code}`, 200);
};

export const closeChatRoom: RequestHandler = (req, res, next) => {
  const store = Store.getInstance();
  const { code } = req.params;

  const foundRoom = store.endRoom(code);
  if (!foundRoom) respondNotFound(res, `Chat room with code ${code} not found`);

  respondData(res, null, `Closed chat room with code ${code}`, 200);
};

export const getPublicRooms: RequestHandler = (req, res, next) => {
  const store = Store.getInstance();
  const rooms = store.getPublicRooms();
  respondData(res, rooms, 'Get public rooms', 200);
};
