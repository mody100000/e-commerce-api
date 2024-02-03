import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  addCoupon,
  deleteCoupon,
  updateCoupon,
  getAllCoupons,
} from "../controller/coupon.controller.js";

const couponRoutes = express.Router();

couponRoutes.post("/coupon", auth, isAdmin, addCoupon);
couponRoutes.put("/coupon/:id", auth, isAdmin, updateCoupon);
couponRoutes.delete("/coupon/:id", auth, isAdmin, deleteCoupon);
//get all coupons
couponRoutes.get("/coupons", auth, getAllCoupons);
export default couponRoutes;
