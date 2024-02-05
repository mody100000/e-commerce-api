import Joi from "joi";

export const signupValidation = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(255).required(),
  CPassword: Joi.ref("password"),
  address: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
    })
  ),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(255).required(),
});

export const updateUserValidation = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email(),
  enabled: Joi.boolean(),
  address: Joi.array().items(
    Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
    })
  ),
});

export const resetPasswordValidation = Joi.object({
  password: Joi.string().min(5).max(255),
});
