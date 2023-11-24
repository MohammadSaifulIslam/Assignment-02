import express from 'express';
import { orderController } from './orders.controller';

const router = express.Router();

router.put('/api/users/:userId/orders', orderController.addOrder);
router.get('/api/users/:userId/orders', orderController.getAllOrders);

export const orderRoutes = router;
