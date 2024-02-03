import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { addCart, updateCart } from "../controller/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post("/cart", auth, isAdmin, addCart);
cartRoutes.put("/cart/:id", auth, isAdmin, updateCart);
//TODO:- Apply coupon on cart if not applied to products

export default cartRoutes;
