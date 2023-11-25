import bycript from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';

import { TOrder, TUser, UserModel } from './users.interface';

export const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: {
    type: String, // TODO: hashing
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  age: Number,
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: Boolean,
  hobbies: Array,
  address: {
    street: String,
    city: String,
    country: String,
  },
  orders: Array<TOrder>,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// hashing passowrd function
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bycript.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.set({ password: undefined, orders: undefined, isDeleted: undefined });
  next();
});
userSchema.post('findOneAndUpdate', function (doc, next) {
  doc.set({ password: undefined, orders: undefined, isDeleted: undefined });
  next();
});

//  creating a static method for checking if a user exist or not
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({
    userId: userId,
    isDeleted: { $eq: false },
  });
  return existingUser;
};
const User = model<TUser, UserModel>('User', userSchema);

export default User;
