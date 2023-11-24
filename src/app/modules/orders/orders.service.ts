import User from '../users/users.model';
import { TOrder } from './orders.interface';

const addOrderIntoDb = async (userId: number, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId },
    { $push: { orders: orderData } },
  );
  return result;
};

export const orderServices = {
  addOrderIntoDb,
};
