import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  resetPassword,
  signIn,
  signUp,
  updateUser,
} from "../controller/user.controller.js";

const userRoutes = express.Router();

// signUp
userRoutes.post("/user/signup", signUp);

//signIn
userRoutes.post("/user/signin", signIn);

//admin can update user
userRoutes.put("/user/:id", auth, isAdmin, updateUser);

//user can change/update/reset password
userRoutes.put("/resetPassword/:id", auth, resetPassword);
export default userRoutes;
