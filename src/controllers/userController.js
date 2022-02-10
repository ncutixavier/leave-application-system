import { generateToken } from "../helpers/generateToken.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity";
import { userExist, createUser, getAllUsers } from "../services/userServices.js";
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
  //   async login(req, res, next) {
  //     try {
  //       const exist = await userExist(req.body.email);
  //       if (exist) {
  //         const valid = await comparePassword(req.body.password, exist.password);
  //         if (!valid) {
  //           res.status(403).json({ status: 403, message: "Invalid credentials" });
  //         }
  //         const token = await generateToken({ id: exist._id });
  //         res.status(200).json({
  //           status: 200,
  //           message: "Logged in successfully",
  //           accessToken: token,
  //         });
  //       } else {
  //         res.status(403).json({ status: 403, message: "Invalid credentials" });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async getAllUsers(req, res) {
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
}

const userController = new UserControllers();
export default userController;
