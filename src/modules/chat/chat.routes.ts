import express from 'express';
import { closeChatRoom, createChatRoom, joinChatRoom } from './chat.controller';

const router = express.Router();

router.get('/chat/:code', joinChatRoom);
router.post('/chat', createChatRoom);
router.patch('/chat/:code', closeChatRoom);

export default router;
