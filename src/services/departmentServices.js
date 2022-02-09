import Department from "../models/Department";

export const departmentExist = async (name) => {
  const department = await Department.findOne({ name: name });
  if (department) {
    return department;
  } else {
    return false;
  }
};

export const getDepartmentById = async (id) => {
  const department = await Department.findById(id);
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

export const updateDepartment = async (id, department) => {
  const departmentUpdated = await Department.findByIdAndUpdate(id, department, {
    new: true,
  });
  return departmentUpdated;
};

export const deleteDepartment = async (id) => {
  const departmentDeleted = await Department.findByIdAndDelete(id);
  return departmentDeleted;
};
