import { generateToken } from "../helpers/generateToken.js";
import sendEmail from "../helpers/sendEmail.js";
import { registerTemplate } from "../helpers/message/registerTemplate.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity";
import {
  userExist,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userServices.js";
import { departmentExist } from "../services/departmentServices.js";

export class UserControllers {
  async register(req, res) {
    try {
      const exist = await userExist(req.body.email);
      const depExist = await departmentExist(req.body.department_name);
      if (exist) {
        res.status(409).json({
          message: "User with this email already exist",
        });
      } else if (!depExist) {
        res.status(404).json({
          message: "Department has not found",
        });
      } else {
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: await hashPassword(req.body.password),
          department: depExist._id,
        };
        const createdUser = await createUser(user);
        sendEmail({
          to: createdUser.email,
          subject: "Leave Application System - Registration",
          message: registerTemplate({
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            password: req.body.password,
          }),
        });
        res.status(201).json({
          status: 201,
          message: "user registered successfully",
          user: createdUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error occured while registering user, try again",
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        const valid = await comparePassword(req.body.password, exist.password);
        if (!valid) {
          res.status(400).json({ message: "Password doesn't match" });
        }
        const token = await generateToken({ id: exist._id });
        res.status(200).json({
          message: "Logged in successfully",
          token: token,
          user: exist,
        });
      } else {
        res.status(404).json({ message: "User email doesn't exist" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error occured while logging in, try again",
        error: error.message,
      });
    }
  }

  async allUsers(req, res) {
    try {
      const users = await getAllUsers();
      return res.status(200).json({
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while getting all users",
        error: error.message,
      });
    }
  }

  async userById(req, res) {
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: "User has not found",
        });
      }
      return res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while getting user by id",
        error: error.message,
      });
    }
  }

  async userUpdate(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, role, department_name } = req.body;
      const depExist = await departmentExist(department_name);
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({
          message: "User has not found",
        });
      } else if (department_name && !depExist) {
        res.status(404).json({
          message: "Department has not found",
        });
      } else {
        const userUpdated = {
          name: name || user.name,
          email: email || user.email,
          password: password || user.password,
          role: role || user.role,
          department: depExist._id,
        };
        const updatedUser = await updateUser(id, userUpdated);
        return res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error occured while updating user",
        error: error.message,
      });
    }
  }

  async userDelete(req, res) {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({
          message: "User has not found",
        });
      }
      const deletedUser = await deleteUser(id);
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while deleting user",
        error: error.message,
      });
    }
  }
}

const userController = new UserControllers();
export default userController;
