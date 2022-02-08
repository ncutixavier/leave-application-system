import express from "express";
import departmentController from "../../controllers/departmentController.js";
import departmentValidation from "../../validations/departmentValidation";
const departmentRouter = express.Router();

departmentRouter
  .route("/")
  .post(departmentValidation, departmentController.createDep)
  .get(departmentController.getAllDep);

export default departmentRouter;
