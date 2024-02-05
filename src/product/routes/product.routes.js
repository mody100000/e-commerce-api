import express from "express";
import { auth } from "../../middleware/auth.js";
import isAdmin from "../../middleware/isAdmin.js";
import { validation } from "./../../middleware/validation.js";
import {
  addProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  getAllProductsInCat,
} from "../controller/product.controller.js";
import {
  addProductValidation,
  updatedProductValidation,
} from "../validation/product.validation.js";

const productRoutes = express.Router();
//admins only can add/update/delete products
productRoutes.post(
  "/products",
  auth,
  isAdmin,
  validation(addProductValidation),
  addProduct
);
productRoutes.put(
  "/product/:id",
  auth,
  isAdmin,
  validation(updatedProductValidation),
  updateProduct
);
productRoutes.delete("/product/:id", auth, isAdmin, deleteProduct);
//get all product with pagination
//to go to the next page plz add ?p=1
productRoutes.get("/products", auth, getAllProducts);
//get specific product
productRoutes.get("/product/:id", auth, getProduct);
//get all products that in the same category
productRoutes.get("/products/:id", auth, getAllProductsInCat);
export default productRoutes;
