import Joi from "joi";

export const addCartValidation = Joi.object({
  userId: Joi.string().hex().min(24).max(24),
  totalPrice: Joi.number(),
  priceAfterDiscount: Joi.number(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().hex().min(24).max(24),
    })
  ),
});
export const updateCartValidation = Joi.object({
  totalPrice: Joi.number(),
  priceAfterDiscount: Joi.number(),
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().hex().min(24).max(24),
    })
  ),
});
