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
  const users = await User.find().select(["-password"]).populate("department");
  return users;
};

export const getUserById = async (id) => {
  const user = await User.findById(id)
    .select(["-password"])
    .populate("department");
  return user;
};

export const updateUser = async (id, user) => {
  const userUpdated = await User.findByIdAndUpdate(id, user, { new: true });
  return userUpdated;
};

export const deleteUser = async (id) => {
  const userDeleted = await User.findByIdAndDelete(id);
  return userDeleted;
};

