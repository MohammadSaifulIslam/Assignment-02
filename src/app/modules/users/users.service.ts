import { TUser } from './users.interface';
import UserModel from './users.model';

const createUserIntoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const userServices = {
  createUserIntoDb,
};
