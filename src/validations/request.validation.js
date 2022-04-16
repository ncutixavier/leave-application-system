import joi from "@hapi/joi";

export const requestValidation = (req, res, next) => {
  const requestSchema = joi.object({
    startDate: joi.date().min("now").required(),
    returnDate: joi.date().min("now").required(),
    numberOfDays: joi.number().required(),
    type: joi.string().required(),
    reason: joi.string().required(),
  });

  const value = requestSchema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  next();
};

export const updateRequestValidation = (req, res, next) => {
  const schema = joi.object({
    status: joi.string().valid("pending", "approved", "rejected").required(),
  });

  const value = schema.validate(req.body);
  if (value.error) {
    res.status(400).json({
      message: value.error.details[0].message.replace(/["'`]+/g, ""),
    });
  }
  next();
};
