import express from "express";
import isAdmin from "../../middleware/isAdmin.js";
import {
  addProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import { auth } from "./../../middleware/auth.js";

const productRoutes = express.Router();
//admins only can add/update/delete products
productRoutes.post("/products", auth, isAdmin, addProduct);
productRoutes.put("/product/:id", auth, isAdmin, updateProduct);
productRoutes.delete("/product/:id", auth, isAdmin, deleteProduct);
//get all product with pagination
//to go to the next page plz add ?p=1
productRoutes.get("/products", auth, getAllProducts);
//get specific product
productRoutes.get("/product/:id", auth, getProduct);
export default productRoutes;
