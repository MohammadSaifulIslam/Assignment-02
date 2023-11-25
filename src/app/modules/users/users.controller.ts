import { Request, Response } from 'express';
import User from './users.model';
import { userServices } from './users.service';
import UsersValidationSchema, { OrderDataValidation } from './users.validation';
const createUser = async (req: Request, res: Response) => {
  try {
    console.log('api hit');
    const userdata = req.body;
    // data validation using zod
    const userValidationData = UsersValidationSchema.parse(userdata);
    const result = await userServices.createUserIntoDb(userValidationData);
    console.log(userdata);
    res.status(200).json({
      status: true,
      message: 'User successfully created',
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

const getAllUser = async (req: Request, res: Response) => {
  const result = await userServices.getAllUserFromDb();
  try {
    res.status(200).json({
      status: true,
      message: 'Users successfully retrived',
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

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    try {
      const result = await userServices.getSingleUserFromDb(Number(userId));
      res.status(200).json({
        status: true,
        message: 'User successfully retrived',
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

const updateSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = req.body;

  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    try {
      const result = await userServices.updateSingleUserIntoDb(
        Number(userId),
        userData,
      );
      res.status(200).json({
        status: true,
        message: 'User successfully updated',
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

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  // check if the user is exists or not
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    const result = await userServices.deleteUserFromDb(Number(userId));
    try {
      res.status(200).json({
        status: true,
        message: 'Users successfully deleted',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Something went wrong!',
        data: error,
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
const addOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orderData = req.body;
  // check if the user is exist or not
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    try {
      // orderdata validation using zod
      const orderValidationData = OrderDataValidation.parse(orderData);
      const result = await userServices.addOrderIntoDb(
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

const getAllOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  // check if the user is exist or not
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    try {
      const result = await userServices.getAllOrdersFromDb(Number(userId));
      res.status(200).json({
        status: true,
        message: 'Order successfully retrived',
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

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  // check if the user is exist or not
  const isUserExists = await User.isUserExists(userId);
  if (isUserExists) {
    try {
      const result = await userServices.getTotalPriceOfOrdersFromDb(
        Number(userId),
      );
      res.status(200).json({
        status: true,
        message: 'Total price successfully retrived',
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
export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateSingleUser,
  addOrder,
  getAllOrders,
  getTotalPriceOfOrders,
};
