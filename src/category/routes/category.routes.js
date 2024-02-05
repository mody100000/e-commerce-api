import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validation } from "./../../middleware/validation.js";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllcategories,
  getCategory,
} from "../controller/category.controller.js";
import {
  addCategoryValidation,
  updateCategoryValidation,
} from "../validation/category.validation.js";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/category",
  auth,
  isAdmin,
  validation(addCategoryValidation),
  addCategory
);
categoryRoutes.put(
  "/category/:id",
  auth,
  isAdmin,
  validation(updateCategoryValidation),
  updateCategory
);
categoryRoutes.delete("/category/:id", auth, isAdmin, deleteCategory);
categoryRoutes.get("/categories", auth, getAllcategories);
categoryRoutes.get("/category/:id", auth, getCategory);
export default categoryRoutes;
