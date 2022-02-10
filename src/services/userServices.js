import User from "../models/User.js";

export const userExist = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return user;
  } else {
    return false;
  }
};

export const createUser = async (user) => {
  const userCreated = await User(user);
  userCreated.save();
  return userCreated;
};

export const getAllUsers = async () => {
  const users = await User.find().populate("department");
  return users;
};
