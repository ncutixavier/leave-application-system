import express from 'express'
import userValidation from '../../validations/userValidation'
import userController from '../../controllers/userController'
const userRouter = express.Router()

userRouter.post("/register", userValidation, userController.register);
userRouter.get("/", userController.getAllUsers);
// route.post('/login', userControllers.login)

export default userRouter;