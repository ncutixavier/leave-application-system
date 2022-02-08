import express from 'express'
import { UserControllers } from '../../controllers/userController.js';
import { userValidation } from '../../validations/userValidation/user.validation.js';

const route = express.Router()

const userControllers = new UserControllers()
route.post('/register', userControllers.register)
// route.post('/login', userControllers.login)

export default route