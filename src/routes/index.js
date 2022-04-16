import express from "express";
import userRouter from "./api/userRoutes";
import departmentRoutes from "./api/departmentRoutes";
import requestRoutes from "./api/request.route";

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/departments", departmentRoutes);
routes.use("/requests", requestRoutes);

export default routes;
