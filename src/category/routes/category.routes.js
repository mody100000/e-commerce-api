import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validation, validationFile } from "./../../middleware/validation.js";
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
import upload from "../../middleware/upload.js";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/category",
  auth,
  isAdmin,
  validationFile(addCategoryValidation),
  upload.single("image"),
  addCategory
);
categoryRoutes.put(
  "/category/:id",
  auth,
  isAdmin,
  validationFile(updateCategoryValidation),
  upload.single("image"),
  updateCategory
);
categoryRoutes.delete("/category/:id", auth, isAdmin, deleteCategory);
categoryRoutes.get("/categories", auth, getAllcategories);
categoryRoutes.get("/category/:id", auth, getCategory);
export default categoryRoutes;
