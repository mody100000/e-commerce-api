import Joi from "joi";

export const addCategoryValidation = Joi.object({
  categoryName: Joi.string().min(3).max(20).required(),
  createdBy: Joi.string().hex().min(24).max(24),
});
export const updateCategoryValidation = Joi.object({
  categoryName: Joi.string().min(3).max(20),
  createdBy: Joi.string().hex().min(24).max(24),
});
