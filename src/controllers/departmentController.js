import {
  departmentExist,
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
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
      } else {
        const newDepartment = await createDepartment({
          name,
          supervisor_name,
          supervisor_email,
        });
        return res.status(201).json({
          department: newDepartment,
        });
      }
      
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

  async getDepById(req, res) {
    try {
      const { id } = req.params;
      const department = await getDepartmentById(id);
      if (!department) {
        return res.status(404).json({
          error: "Department has not found",
        });
      }
      return res.status(200).json({
        department,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while getting department by id",
        error: error.message,
      });
    }
  }

  async updateDep(req, res) {
    try {
      const { id } = req.params;
      const { name, supervisor_name, supervisor_email } = req.body;
      const department = await getDepartmentById(id);
      if (!department) {
        return res.status(404).json({
          error: "Department has not found",
        });
      }
      const updatedDepartment = await updateDepartment(id, {
        name,
        supervisor_name,
        supervisor_email,
      });
      return res.status(200).json({
        department: updatedDepartment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while updating department",
        error: error.message,
      });
    }
  }

  async deleteDep(req, res) {
    try {
      const { id } = req.params;
      const department = await getDepartmentById(id);
      if (!department) {
        return res.status(404).json({
          error: "Department has not found",
        });
      }
      await deleteDepartment(id);
      return res.status(200).json({
        message: "Department has been deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error occured while deleting department",
        error: error.message,
      });
    }
  }
}

const departmentController = new DepartmentController();
export default departmentController;
