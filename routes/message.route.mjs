import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.mjs';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.mjs';
const messageRoutes = express.Router();

messageRoutes.get('/users', protectRoute, getUserForSidebar)
messageRoutes.get('/:id', protectRoute, getMessages)
messageRoutes.post('/send/:id', protectRoute, sendMessage)

export default messageRoutes;