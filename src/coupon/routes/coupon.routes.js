import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { addCoupon } from "../controller/coupon.controller.js";

const couponRoutes = express.Router();

couponRoutes.post("/coupon", auth, isAdmin, addCoupon);

export default couponRoutes;
