import express from "express";
import requestController from "../../controllers/request.controller";
import { requestValidation } from "../../validations/request.validation";
import { protect, restrictTo } from "../../middlewares/protectRoute";
import {
  checkPreviousRequest,
  checkRequestExists,
  checkPendingRequest,
} from "../../middlewares/request.middleware";
const requestRouter = express.Router();

requestRouter
  .route("/")
  .post(
    protect,
    restrictTo("admin", "manager", "employee"),
    requestValidation,
    checkPreviousRequest,
    requestController.createRequest
  )
  .get(
    protect,
    restrictTo("admin", "manager", "employee"),
    requestController.getAllRequests
  );

requestRouter
  .route("/:id")
  .patch(
    protect,
    restrictTo("admin", "employee"),
    checkRequestExists,
    checkPendingRequest,
    requestController.updateRequest
  )
  .delete(
    protect,
    restrictTo("admin", "employee"),
    checkRequestExists,
    checkPendingRequest,
    requestController.deleteRequest
  );

export default requestRouter;
