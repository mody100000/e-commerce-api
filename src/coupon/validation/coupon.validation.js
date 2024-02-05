import Joi from "joi";

export const addCouponValidation = Joi.object({
  couponCode: Joi.string().min(3).max(20).required(),
  value: Joi.number().required(),
  createdBy: Joi.string().hex().min(24).max(24),
  expireIn: Joi.date(),
});

export const updateCouponValidation = Joi.object({
  couponCode: Joi.string().min(3).max(20),
  value: Joi.number(),
  updatedBy: Joi.string().hex().min(24).max(24),
  expireIn: Joi.date(),
});
