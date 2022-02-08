import joi from "@hapi/joi";

const departmentValidation = (req, res, next) => {
  const departmentSchema = joi.object({
    name: joi.string().required().messages({
      "any.required": "Department name is required",
    }),
    supervisor_name: joi.string().required().messages({
      "any.required": "Supervisor name is required",
    }),
    supervisor_email: joi.string().email().required().messages({
      "any.required": "Supervisor email is required",
      "string.email": "Supervisor email is invalid",
    }),
  });

  const value = departmentSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

export default departmentValidation;
