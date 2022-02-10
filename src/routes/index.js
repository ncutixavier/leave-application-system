import express from "express";
import userRouter from "./api/userRoutes";
import departmentRoutes from "./api/departmentRoutes";

const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/departments", departmentRoutes);

export default routes;
