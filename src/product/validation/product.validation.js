import Joi from "joi";

export const addProductValidation = Joi.object({
  productName: Joi.string().min(3).max(20).required(),
  slug: Joi.string().required(),
  priceAfterDiscound: Joi.number(),
  finalPrice: Joi.number().required(),
  userId: Joi.string().hex().min(24).max(24),
  category: Joi.string().hex().min(24).max(24),
  stock: Joi.number().required(),
});

export const updatedProductValidation = Joi.object({
  productName: Joi.string().min(3).max(20),
  slug: Joi.string(),
  priceAfterDiscound: Joi.number(),
  finalPrice: Joi.number(),
  category: Joi.string().hex().min(24).max(24),
  stock: Joi.number(),
});
