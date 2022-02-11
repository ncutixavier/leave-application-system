import express from "express";
import userValidation from "../../validations/userValidation";
import userController from "../../controllers/userController";
const userRouter = express.Router();

userRouter.post("/register", userValidation, userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/", userController.allUsers);

userRouter
  .route("/:id")
  .get(userController.userById)
  .patch(userController.userUpdate)
  .delete(userController.userDelete);
// route.post('/login', userControllers.login)

export default userRouter;
