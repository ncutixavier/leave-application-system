import Department from "../models/Department";

export const departmentExist = async (name) => {
  const department = await Department.findOne({ name: name });
  if (department) {
    return department;
  } else {
    return false;
  }
};

export const createDepartment = async (department) => {
  const departmentCreated = await Department(department);
  departmentCreated.save();
  return departmentCreated;
};

export const getAllDepartments = async () => {
  const departments = await Department.find();
  return departments;
};
