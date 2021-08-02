import express from 'express';
import {
  closeChatRoom, createChatRoom, getChatRoom, getPublicRooms,
} from './chat.controller';

const router = express.Router();

router.get('/chat/:code', getChatRoom);
router.get('/rooms', getPublicRooms);
router.post('/chat', createChatRoom);
router.patch('/chat/:code', closeChatRoom);

export default router;
