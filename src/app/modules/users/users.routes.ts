import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router();

router.post('/api/users', userControllers.createUser);
router.get('/api/users', userControllers.getAllUser);
router.get('/api/users/:userId', userControllers.getSingleUser);
router.put('/api/users/:userId', userControllers.updateSingleUser);
router.delete('/api/users/:userId', userControllers.deleteUser);

export const userRoutes = router;
