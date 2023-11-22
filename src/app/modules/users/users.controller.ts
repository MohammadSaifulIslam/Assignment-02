import { Request, Response } from 'express';
import { userServices } from './users.service';
const createUser = async (req: Request, res: Response) => {
  try {
    console.log('api hit');
    const userdata = req.body;
    // data validation using zod
    // const userValidationData = UsersValidationSchema.parse(userdata);
    const result = await userServices.createUserIntoDb(userdata);
    console.log(userdata);
    res.status(200).json({
      status: true,
      message: 'User have successfully created',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong!',
      data: error,
    });
  }
};

export const userControllers = {
  createUser,
};
