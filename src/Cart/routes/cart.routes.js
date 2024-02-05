import express from "express";
import { addCart, updateCart } from "../controller/cart.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  addCartValidation,
  updateCartValidation,
} from "../validation/cart.validation.js";
import { auth } from "../../middleware/auth.js";

const cartRoutes = express.Router();

cartRoutes.post("/cart", auth, validation(addCartValidation), addCart);
cartRoutes.put("/cart/:id", auth, validation(updateCartValidation), updateCart);

export default cartRoutes;
