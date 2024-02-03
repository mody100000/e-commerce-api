import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllcategories,
  getCategory,
} from "../controller/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/category", auth, isAdmin, addCategory);
categoryRoutes.put("/category/:id", auth, isAdmin, updateCategory);
categoryRoutes.delete("/category/:id", auth, isAdmin, deleteCategory);
categoryRoutes.get("/categories", auth, getAllcategories);
categoryRoutes.get("/category/:id", auth, getCategory);
export default categoryRoutes;
