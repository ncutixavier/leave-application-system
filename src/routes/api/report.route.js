import express from "express";
import { protect, restrictTo } from "../../middlewares/protectRoute";
import reportController from "../../controllers/report.controller";

const reportRouter = express.Router();

reportRouter
  .route("/")
  .get(
    protect,
    restrictTo("admin", "manager", "employee"),
    reportController.getUserReport
  );

export default reportRouter;
