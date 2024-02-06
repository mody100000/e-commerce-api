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
export const validationFile = (schema) => {
  return (req, res, next) => {
    let checkvalidation = schema.validate(req.file, {
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
// export const validationFile = (schema) => {
//   return (req, res, next) => {
//     const checkValidation = schema.validate(req.file, {
//       abortEarly: false,
//     });

//     if (checkValidation.error) {
//       return res.status(400).json({
//         message: "Validation error",
//         errors: checkValidation.error.details,
//       });
//     } else {
//       next();
//     }
//   };
// };
