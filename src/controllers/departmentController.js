import {
  departmentExist,
  createDepartment,
  getAllDepartments,
} from "../services/departmentServices";

class DepartmentController {
  async createDep(req, res) {
    try {
      const { name, supervisor_name, supervisor_email } = req.body;
      const department = await departmentExist(name);
      if (department) {
        return res.status(409).json({
          error: "Department already exist",
        });
      }
      const newDepartment = await createDepartment({
        name,
        supervisor_name,
        supervisor_email,
      });
      return res.status(201).json({
        department: newDepartment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while creating department",
        error: error.message,
      });
    }
  }

  async getAllDep(req, res) {
    try {
      const departments = await getAllDepartments();
      return res.status(200).json({
        departments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while getting all departments",
        error: error.message,
      });
    }
  }
}

const departmentController = new DepartmentController();
export default departmentController;
