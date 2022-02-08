import express from "express";
import departmentController from "../../controllers/departmentController.js";

const departmentRouter = express.Router();

departmentRouter
  .route("/")
  .post(departmentController.createDep)
  .get(departmentController.getAllDep);

export default departmentRouter;
