import joi from "@hapi/joi";

export const userValidation = async (req, res, next) => {
  const userSchema = joi.object({
    name: joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Email is invalid",
    }),
    password: joi.string().min(8).required().messages({
      "any.required": "Password is required",
      "string.min": "Password must be atleast 8 characters",
    }),
    department_name: joi.string().required().messages({
      "any.required": "Department is required",
    }),
  });

  const value = await userSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

export const resetPasswordValidation = async (req, res, next) => { 
  const schema = joi.object({
    password: joi.string().min(8).required(),
    otp: joi.string().required(),
    email: joi.string().email().required(),
  })

  const value = await schema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  next();
}
