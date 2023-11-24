import express from 'express';
import { orderController } from './orders.controller';

const router = express.Router();

router.put('/api/users/:userId/orders', orderController.addOrder);

export const orderRoutes = router;
