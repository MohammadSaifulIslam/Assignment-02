import bycript from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './users.interface';
const UserSchema = new Schema<TUser>({
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
});

// hashing passowrd function
UserSchema.pre('save', async function () {
  const user = this;
  user.password = await bycript.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );
});

const UserModel = model<TUser>('User', UserSchema);

export default UserModel;
