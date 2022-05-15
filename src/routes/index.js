import express from "express";
import userRouter from "./api/userRoutes";
import departmentRoutes from "./api/departmentRoutes";
import requestRoutes from "./api/request.route";
import reportRoutes from "./api/report.route";

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/departments", departmentRoutes);
routes.use("/requests", requestRoutes);
routes.use("/reports", reportRoutes);

export default routes;
