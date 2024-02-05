export const validation = (schema) => {
  return (req, res, next) => {
    let checkvalidation = schema.validate(req.body, {
      abortEarly: false,
    });
    if (checkvalidation && checkvalidation.error) {
      res.json({
        message: "validation error",
        err: checkvalidation.error.details,
      });
    } else {
      next();
    }
  };
};
