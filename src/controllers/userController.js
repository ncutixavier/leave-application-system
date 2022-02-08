import { generateToken } from "../helpers/generateToken.js";
import { comparePassword, hashPassword } from "../helpers/passwordSecurity";
import { userExist, createUser } from "../services/userServices.js";

export class UserControllers {
  async register(req, res, next) {
    try {
      const exist = await userExist(req.body.email);
      if (exist) {
        res.status(409).json({
          message: "User with this email already exist",
        });
      } else {
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: await hashPassword(req.body.password),
          picture: req.body.picture,
        };
        const createdUser = await createUser(user);
        res.status(201).json({
          status: 201,
          message: "user registered successfully",
          user: createdUser,
        });
      }
    } catch (error) {
      console.log(error);
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
}
