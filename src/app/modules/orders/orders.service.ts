import User from '../users/users.model';
import { TOrder } from './orders.interface';

const addOrderIntoDb = async (userId: number, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId },
    { $push: { orders: orderData } },
  );
  return result;
};

const getAllOrdersFromDb = async (userId: number) => {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};
export const orderServices = {
  addOrderIntoDb,
  getAllOrdersFromDb,
};
