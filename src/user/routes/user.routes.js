import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validation } from "./../../middleware/validation.js";
import {
  resetPassword,
  signIn,
  signUp,
  verfiyAccount,
  updateUser,
} from "../controller/user.controller.js";
import {
  loginValidation,
  resetPasswordValidation,
  signupValidation,
  updateUserValidation,
} from "../validation/user.validation.js";

const userRoutes = express.Router();

// signUp
userRoutes.post("/user/signup", validation(signupValidation), signUp);

//signIn
userRoutes.post("/user/signin", validation(loginValidation), signIn);

//admin can update and Deactivate user
userRoutes.put(
  "/user/:id",
  auth,
  isAdmin,
  validation(updateUserValidation),
  updateUser
);

//user can change/update/reset password
userRoutes.put(
  "/resetPassword/:id",
  auth,
  validation(resetPasswordValidation),
  resetPassword
);

//verfiy account
userRoutes.get("/user/verfiy/:token", verfiyAccount);
export default userRoutes;
