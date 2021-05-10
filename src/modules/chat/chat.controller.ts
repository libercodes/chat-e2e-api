import { RequestHandler } from 'express';
import { v4 } from 'uuid';
import { respondData, respondNotFound } from '../../helpers/response.helper';
import { Room } from '../../models/room';

const onGoingRooms: Room[] = [];

export const createChatRoom: RequestHandler = (req, res, next) => {
  const code = v4();

  const room: Room = {
    code,
    startedAt: new Date(),
  };
  onGoingRooms.push(room);

  respondData(res, room, 'Chat room created', 201);
};

export const joinChatRoom: RequestHandler = (req, res, next) => {
  const { code } = req.params;

  const foundRoom = onGoingRooms.find((room: Room) => room.code === code);
  if (!foundRoom) respondNotFound(res, `Chat room with code ${code} not found`);

  respondData(res, foundRoom, `Joined to chat room with code ${code}`, 200);
};

export const closeChatRoom: RequestHandler = (req, res, next) => {
  const { code } = req.params;

  const foundRoom = onGoingRooms.find((room: Room) => room.code === code);
  if (!foundRoom) respondNotFound(res, `Chat room with code ${code} not found`);
  foundRoom.endedAt = new Date();

  respondData(res, foundRoom, `Closed chat room with code ${code}`, 200);
};
