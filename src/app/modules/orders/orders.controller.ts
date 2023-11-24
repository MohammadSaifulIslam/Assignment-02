import { Request, Response } from 'express';
import User from '../users/users.model';
import { orderServices } from './orders.service';
import { OrderDataValidation } from './orders.validation';

const addOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orderData = req.body;
  // orderdata validation using zod
  // check if the user is exist or not
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    try {
      const orderValidationData = OrderDataValidation.parse(orderData);
      const result = await orderServices.addOrderIntoDb(
        Number(userId),
        orderValidationData,
      );
      res.status(200).json({
        status: true,
        message: 'Order successfully added',
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Something went wrong',
        error: {
          code: 404,
          description: err,
        },
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const orderController = {
  addOrder,
};
