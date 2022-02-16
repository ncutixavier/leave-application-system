import User from "../models/User.js";
import { generateToken, decodeToken } from "../helpers/generateToken.js";
import sendEmail from "../helpers/sendEmail.js";
import { registerTemplate } from "../helpers/message/registerTemplate.js";
import { resetPasswordTemplate } from "../helpers/message/resetPasswordTemplate.js";
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
        return res.status(409).json({
          message: "User with this email already exist",
        });
      } else if (!depExist) {
        return res.status(404).json({
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
        return res.status(201).json({
          status: 201,
          message: "user registered successfully",
          user: createdUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
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
          return res.status(400).json({ message: "Password doesn't match" });
        }
        const token = await generateToken(
          { id: exist._id, role: exist.role },
          "7d"
        );
        const user = await User.findByIdAndUpdate(exist._id, {
          isLoggedIn: true,
        });

        return res.status(200).json({
          message: "Logged in successfully",
          token: token,
          user: user,
        });
      } else {
        return res.status(404).json({ message: "User email doesn't exist" });
      }
    } catch (error) {
      return res.status(500).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
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
        return res.status(404).json({
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
      return res.status(500).json({
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
      return res.status(500).json({
        message: "Error occured while deleting user",
        error: error.message,
      });
    }
  }

  async userLogout(req, res) {
    try {
      if (req.user.isLoggedIn) {
        await updateUser(req.user._id, { isLoggedIn: false });
        return res.status(200).json({
          message: "User logged out successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while logging out user",
        error: error.message,
      });
    }
  }

  async userChangePassword(req, res) {
    try {
      if (req.user.isLoggedIn) {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;
        const isoldPasswordValid = await comparePassword(
          oldPassword,
          req.user.password
        );
        if (!isoldPasswordValid) {
          return res.status(400).json({
            message: "Old password doesn't match",
          });
        }
        const newPasswordHash = await hashPassword(newPassword);
        await updateUser(id, { password: newPasswordHash });
        return res.status(200).json({
          message: "Password changed successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while changing password",
        error: error.message,
      });
    }
  }

  async userForgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await userExist(email);
      if (!user) {
        return res.status(404).json({
          message: "User has not found",
        });
      }
      const token = await generateToken(
        { id: user._id, role: user.role },
        "1800s"
      );
      const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      sendEmail({
        to: email,
        subject: "Leave Application System - Reset Password",
        message: resetPasswordTemplate(resetPasswordLink),
      });
      return res.status(200).json({
        message: "Reset password link has been sent to your email",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while forgot password",
        error: error.message,
      });
    }
  }

  async userResetPassword(req, res) {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const decoded = await decodeToken(token);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token, Use link sent to your email",
        });
      }
      await updateUser(decoded.id, {
        password: await hashPassword(newPassword),
      });
      return res.status(200).json({
        message: "Password has been reset successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while reset password",
        error: error.message,
      });
    }
  }

  async userUpdateProfile(req, res) {
    try {
      if (req.user.isLoggedIn) {
        const { id } = req.user;
        const { name, email, department_name } = req.body;
        const depExist = await departmentExist(department_name);
        if (department_name && !depExist) {
          return res.status(404).json({
            message: "Department has not found",
          });
        }
        const userProfile = await updateUser(id, {
          name: name || req.user.name,
          email: email || req.user.email,
          department: depExist._id || req.user.department,
        });
        return res.status(200).json({
          message: "Profile updated successfully",
          user: userProfile,
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while updating profile",
        error: error.message,
      });
    }
  }
}

const userController = new UserControllers();
export default userController;
