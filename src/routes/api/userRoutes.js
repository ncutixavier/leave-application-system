import express from "express";
import userValidation from "../../validations/userValidation";
import userController from "../../controllers/userController";
import { protect } from "../../middlewares/protectRoute";
const userRouter = express.Router();

userRouter.post("/register", userValidation, userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/logout", protect, userController.userLogout);
userRouter.patch("/change-password", protect, userController.userChangePassword);
userRouter.post("/forgot-password", userController.userForgotPassword);
userRouter.patch("/reset-password/:token", userController.userResetPassword);
userRouter.patch("/update-profile", protect, userController.userUpdateProfile);
userRouter.get("/", userController.allUsers);

userRouter
  .route("/:id")
  .get(userController.userById)
  .patch(userController.userUpdate)
  .delete(userController.userDelete);

export default userRouter;
