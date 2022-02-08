import express from "express";
import userRoutes from "./api/userRoutes";
import departmentRoutes from "./api/departmentRoutes";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/departments", departmentRoutes);

export default routes;
