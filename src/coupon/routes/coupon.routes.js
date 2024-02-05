import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validation } from "./../../middleware/validation.js";
import {
  addCoupon,
  deleteCoupon,
  updateCoupon,
  applyCoupon,
  getAllCoupons,
  applyCouponToCart,
} from "../controller/coupon.controller.js";
import {
  addCouponValidation,
  updateCouponValidation,
} from "../validation/coupon.validation.js";

const couponRoutes = express.Router();

couponRoutes.post(
  "/coupon",
  auth,
  isAdmin,
  validation(addCouponValidation),
  addCoupon
);
couponRoutes.put(
  "/coupon/:id",
  auth,
  isAdmin,
  validation(updateCouponValidation),
  updateCoupon
);
// apply soft delete for the coupon
couponRoutes.delete("/coupon/:id", auth, isAdmin, deleteCoupon);
//get all coupons
couponRoutes.get("/coupons", auth, getAllCoupons);
//apply coupon
// you can use the coupon only one time after that the coupon is deleted (softDelete)
couponRoutes.put("/applyCoupon", auth, applyCoupon);
couponRoutes.put("/applyCouponToCart", auth, applyCouponToCart);
export default couponRoutes;
