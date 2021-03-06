import express from "express";
import {
  userValidation,
  resetPasswordValidation,
} from "../../validations/userValidation";
import userController from "../../controllers/userController";
import { protect, restrictTo } from "../../middlewares/protectRoute";
import { checkExistUser, compareOtp } from "../../middlewares/user.middleware";
const userRouter = express.Router();

userRouter.post("/register", userValidation, userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/logout", protect, userController.userLogout);
userRouter.patch(
  "/change-password",
  protect,
  userController.userChangePassword
);
userRouter.post("/forgot-password", userController.userForgotPassword);
userRouter.put("/forgot-password", userController.mobileUserForgotPassword);
userRouter.patch("/reset-password/:token", userController.userResetPassword);
userRouter.put(
  "/reset-password",
  resetPasswordValidation,
  checkExistUser,
  compareOtp,
  userController.mobileUserResetPassword
);
userRouter.patch("/update-profile", protect, userController.userUpdateProfile);
userRouter.get(
  "/",
  protect,
  restrictTo("admin", "manager"),
  userController.allUsers
);

userRouter
  .route("/:id")
  .get(protect, restrictTo("admin", "manager"), userController.userById)
  .patch(protect, restrictTo("admin", "manager"), userController.userUpdate)
  .delete(protect, restrictTo("admin", "manager"), userController.userDelete);

export default userRouter;
