import express from "express";
import departmentController from "../../controllers/departmentController.js";
import departmentValidation from "../../validations/departmentValidation";
import { protect, restrictTo } from "../../middlewares/protectRoute";

const departmentRouter = express.Router();

departmentRouter
  .route("/")
  .post(
    protect,
    restrictTo("admin", "manager"),
    departmentValidation,
    departmentController.createDep
  )
  .get(departmentController.getAllDep);

departmentRouter
  .route("/:id")
  .get(departmentController.getDepById)
  .patch(
    protect,
    restrictTo("admin", "manager"),
    departmentController.updateDep
  )
  .delete(
    protect,
    restrictTo("admin", "manager"),
    departmentController.deleteDep
  );
export default departmentRouter;
